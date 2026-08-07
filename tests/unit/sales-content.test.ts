import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SignJWT } from 'jose';

import { buildPayload, repContent, CONTENT_VERSION } from '../../api/_content/index.ts';
import { MANAGER_CANARIES } from '../../api/_content/manager.ts';
import {
  SALES_COOKIE,
  clearedAdminCookie,
  clearedCookie,
  roleForPassword,
  sessionCookie,
  signSalesToken,
  verifySalesRequest,
} from '../../api/_lib/salesAuth.ts';

/**
 * Unit tests for the sales portal content contract.
 *
 * Run with:  npm run test:unit
 *
 * Two things are being protected here. First, referential integrity — a broken
 * cross-reference means a rep taps a link at a booth and lands nowhere. Second,
 * and much more important, the rep/manager boundary: the sales pack is explicit
 * that five documents are "never given to a rep", and the only assertion that
 * really matters in this file is that the rep payload cannot contain them.
 */

describe('answer key integrity', () => {
  it('has unique entry ids', () => {
    const ids = repContent.answerKey.map((entry) => entry.id);
    assert.equal(new Set(ids).size, ids.length, 'duplicate answer key ids');
  });

  it('resolves every sectionId to a declared section', () => {
    const sectionIds = new Set(repContent.answerKeySections.map((section) => section.id));
    for (const entry of repContent.answerKey) {
      assert.ok(
        sectionIds.has(entry.sectionId),
        `${entry.id} references unknown section "${entry.sectionId}"`
      );
    }
  });

  it('gives every entry a non-empty question and answer', () => {
    for (const entry of repContent.answerKey) {
      assert.ok(entry.question.trim().length > 0, `${entry.id} has no question`);
      assert.ok(entry.answer.trim().length > 0, `${entry.id} has no answer`);
    }
  });

  it('gives every provisional entry a parseable expiry', () => {
    const provisional = repContent.answerKey.filter((entry) => entry.status === 'provisional');
    assert.ok(provisional.length > 0, 'expected at least one provisional ruling');

    for (const entry of provisional) {
      assert.ok(entry.expiresOn, `${entry.id} is provisional but has no expiresOn`);
      assert.ok(
        Number.isFinite(Date.parse(entry.expiresOn as string)),
        `${entry.id} has an unparseable expiresOn: ${entry.expiresOn}`
      );
    }
  });

  it('gives every blocked entry a verbatim deflection to say', () => {
    const blocked = repContent.answerKey.filter((entry) => entry.status === 'blocked');
    assert.ok(blocked.length > 0, 'expected at least one blocked ruling');

    for (const entry of blocked) {
      // A blocked row IS the script. An empty one would leave a rep improvising
      // exactly where improvising is most expensive.
      assert.ok(entry.answer.trim().length > 20, `${entry.id} is blocked but has no deflection`);
    }
  });

  it('resolves every neverSayIds reference', () => {
    const neverSayIds = new Set(repContent.neverSay.map((row) => row.id));
    for (const entry of repContent.answerKey) {
      for (const id of entry.neverSayIds ?? []) {
        assert.ok(neverSayIds.has(id), `${entry.id} references unknown never-say "${id}"`);
      }
    }
  });
});

describe('hardware facts', () => {
  // Corrected 2026-08-07: we do not use Blum. It had been stated on three of
  // the four lines, sourced from the 2026 spec of record, and it reached the
  // printed handbook and field card before anyone caught it. This test is the
  // guard against it coming back the next time someone syncs from that spec.
  const BLUM = /\bblum\b/i;

  it('names no hinge brand other than DTC in customer-facing copy', () => {
    for (const line of repContent.productLines) {
      const text = [line.positioning, line.doors, line.slide, ...line.bestFor].join(' ');
      assert.ok(!BLUM.test(text), `product line "${line.name}" still mentions Blum`);
    }

    assert.ok(!BLUM.test(repContent.hardware.hinges), 'hardware.hinges mentions Blum');
    assert.ok(!BLUM.test(repContent.hardware.slides), 'hardware.slides mentions Blum');
    assert.ok(!BLUM.test(repContent.hardware.partners), 'hardware.partners still lists Blum');
  });

  it('states DTC as the hinge across every line', () => {
    assert.match(repContent.hardware.hinges, /DTC/);
    assert.match(repContent.hardware.hinges, /every line/i);
  });

  it('mentions Blum only where it is being warned against', () => {
    // Two places may legitimately say it: the never-say row and the coaching
    // note on the hardware answer. Anywhere else is a leak of the old claim.
    const offenders: string[] = [];

    for (const entry of repContent.answerKey) {
      if (BLUM.test(entry.answer)) offenders.push(`${entry.id}.answer`);
    }
    for (const objection of repContent.objections) {
      if (BLUM.test(objection.response.join(' '))) offenders.push(`${objection.id}.response`);
    }
    for (const pitch of repContent.pitches) {
      if (BLUM.test(pitch.script.join(' '))) offenders.push(`${pitch.id}.script`);
    }

    assert.deepEqual(offenders, [], `Blum still appears in: ${offenders.join(', ')}`);
  });

  it('states KV 8450FM as the slide on every line, with no per-line ladder', () => {
    // Answer Key v1.1: the slides do not ladder either. The portal previously
    // had DTC undermount / KV GS4270 / KV 8450FM across the four lines, which
    // was the same error as Blum in a different column.
    assert.match(repContent.hardware.slides, /8450FM/);
    assert.match(repContent.hardware.slides, /every line/i);

    for (const line of repContent.productLines) {
      const serialised = JSON.stringify(line);
      assert.ok(
        !/GS4270|8450|undermount/i.test(serialised),
        `product line "${line.name}" still carries per-line slide detail`
      );
    }
  });

  it('gives every line a finish collection and décor count summing to 142', () => {
    for (const line of repContent.productLines) {
      assert.ok(line.collections.trim().length > 0, `${line.name} has no collections`);
      assert.ok(line.decors > 0, `${line.name} has no décor count`);
    }
    const total = repContent.productLines.reduce((sum, line) => sum + line.decors, 0);
    assert.equal(total, 142, 'the four lines should account for all 142 décors');
  });

  it('keeps blum searchable so a rep who remembers it finds the correction', () => {
    const hardwareAnswer = repContent.answerKey.find((entry) => entry.id === 'ak-03-02');
    assert.ok(hardwareAnswer, 'ak-03-02 is missing');
    assert.ok(
      (hardwareAnswer.aliases ?? []).some((alias) => BLUM.test(alias)),
      'searching "blum" must surface the hardware correction'
    );
  });
});

describe('Answer Key v1.3 rulings', () => {
  it('is stamped at v1.3', () => {
    assert.match(repContent.version, /v1\.3/);
  });

  it('says we manufacture frameless but sell a stocked framed line', () => {
    // v1.2. The old flat "we build frameless only" walked away from customers
    // we can actually serve.
    const sells = repContent.answerKey.find((entry) => entry.id === 'ak-02-02b');
    assert.ok(sells, 'the "do you sell framed" row is missing');
    assert.match(sells.answer, /stocked RTA framed line/i);

    const builds = repContent.answerKey.find((entry) => entry.id === 'ak-02-02');
    assert.ok(builds, 'the "do you make framed" row is missing');
    assert.match(builds.answer, /manufacture frameless only/i);

    // Everything specific about the framed line is blocked — no stock sheet.
    const specifics = repContent.answerKey.find((entry) => entry.id === 'ak-02-02d');
    assert.equal(specifics?.status, 'blocked');
  });

  it('never claims a closet is plywood or "same materials as the kitchens"', () => {
    // v1.3. That sentence was on the printed field card and implied a plywood
    // closet carcass at no extra cost.
    assert.match(repContent.closets.sayThis, /different board/i);

    const neverSayIds = new Set(repContent.neverSay.map((row) => row.id));
    assert.ok(neverSayIds.has('ns-closet-plywood'), 'the closet-plywood never-say is missing');

    // The phrase may appear where it is being warned against — the never-say
    // row and a provenance note. It must not appear in anything a rep says.
    const retired = /same materials as the kitchens/i;
    const spoken = [
      ...repContent.answerKey.map((entry) => entry.answer),
      ...repContent.objections.flatMap((objection) => objection.response),
      ...repContent.pitches.flatMap((pitch) => pitch.script),
      repContent.closets.core,
      repContent.closets.sayThis,
      repContent.closets.plywoodOption,
    ];
    for (const line of spoken) {
      assert.ok(!retired.test(line), `retired closet claim is back in: "${line.slice(0, 60)}…"`);
    }
  });

  it('carries the six-way hinge claim as provisional, not ruled', () => {
    // It is PROVISIONAL because the part number's spec sheet is still missing,
    // not because the claim is doubted.
    const sixWay = repContent.answerKey.find((entry) => entry.id === 'ak-03-02c');
    assert.ok(sixWay, 'the six-way adjustable row is missing');
    assert.equal(sixWay.status, 'provisional');
    assert.ok(sixWay.expiresOn, 'a provisional ruling needs an expiry');
  });

  it('hosts the deck and handout on the site', () => {
    const hrefs = repContent.library.training.map((link) => link.href);
    assert.ok(hrefs.includes('/sales-training/deck.html'), 'the deck is not linked');
    assert.ok(hrefs.includes('/sales-training/guide.pdf'), 'the PDF handout is not linked');
    for (const href of hrefs) {
      assert.ok(href.startsWith('/sales-training/'), `unexpected training href: ${href}`);
    }
  });
});

describe('cross-references', () => {
  it('resolves every objection answerKeyIds and neverSayIds', () => {
    const answerIds = new Set(repContent.answerKey.map((entry) => entry.id));
    const neverSayIds = new Set(repContent.neverSay.map((row) => row.id));

    for (const objection of repContent.objections) {
      for (const id of objection.answerKeyIds ?? []) {
        assert.ok(answerIds.has(id), `${objection.id} references unknown answer "${id}"`);
      }
      for (const id of objection.neverSayIds ?? []) {
        assert.ok(neverSayIds.has(id), `${objection.id} references unknown never-say "${id}"`);
      }
    }
  });

  it('uses absolute internal links and https external ones', () => {
    const links = [
      ...repContent.library.videos,
      ...repContent.library.documents,
      ...repContent.library.siteLinks,
      ...repContent.answerKey.flatMap((entry) => entry.links ?? []),
    ];

    assert.ok(links.length > 0, 'expected some links');

    for (const link of links) {
      if (link.href.startsWith('/')) continue;
      assert.ok(
        link.href.startsWith('https://'),
        `"${link.label}" is neither an absolute path nor https: ${link.href}`
      );
    }
  });

  it('has all eleven answer key sections', () => {
    const numbers = repContent.answerKeySections.map((section) => section.number).sort((a, b) => a - b);
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
});

describe('rep / manager boundary', () => {
  it('omits the manager key entirely from a rep payload', () => {
    const payload = buildPayload('rep');
    assert.equal(payload.manager, undefined);
    assert.ok(!('manager' in payload), 'rep payload must not carry a manager key at all');
  });

  it('includes manager content for a manager', () => {
    const payload = buildPayload('manager');
    assert.ok(payload.manager, 'manager payload is missing manager content');
    assert.ok(payload.manager.docs.length > 0, 'manager content has no documents');
  });

  it('leaks no manager canary into the serialised rep payload', () => {
    // The assertion that actually matters. If a manager-only phrase can be
    // found anywhere in what a rep receives, the boundary has failed.
    const serialised = JSON.stringify(buildPayload('rep'));

    for (const canary of MANAGER_CANARIES) {
      assert.ok(
        !serialised.includes(canary),
        `rep payload contains manager-only content: "${canary}"`
      );
    }
  });

  it('keeps the canary list meaningful', () => {
    // A canary that is not in the manager payload guards nothing, and would
    // silently pass forever.
    const serialised = JSON.stringify(buildPayload('manager'));

    for (const canary of MANAGER_CANARIES) {
      assert.ok(
        serialised.includes(canary),
        `canary "${canary}" is not present in manager content — it guards nothing`
      );
    }
  });

  it('stamps a content version', () => {
    assert.match(CONTENT_VERSION, /^\d{4}-\d{2}-\d{2}\.\d+$/);
    assert.equal(buildPayload('rep').version, CONTENT_VERSION);
  });
});

describe('session tokens', () => {
  const SECRET = 'test-only-sales-secret-not-used-anywhere-real';

  /** Minimal stand-in for the bits of VercelRequest that salesAuth reads. */
  const requestWith = (token?: string) =>
    ({ cookies: token ? { [SALES_COOKIE]: token } : {} }) as never;

  const ADMIN_SECRET = 'test-only-admin-secret-not-used-anywhere-real';

  const withSecret = async (run: () => Promise<void>) => {
    const previous = { sales: process.env.SALES_JWT_SECRET, admin: process.env.JWT_SECRET };
    process.env.SALES_JWT_SECRET = SECRET;
    process.env.JWT_SECRET = ADMIN_SECRET;
    try {
      await run();
    } finally {
      process.env.SALES_JWT_SECRET = previous.sales;
      process.env.JWT_SECRET = previous.admin;
    }
  };

  /** Mimics the cookie api/admin/auth.ts issues. */
  const adminToken = (secret: string, claims: Record<string, unknown> = {}) =>
    new SignJWT({ authenticated: true, ...claims })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(secret));

  const requestWithAdmin = (token: string) => ({ cookies: { admin_token: token } }) as never;

  it('round-trips a rep token', async () => {
    await withSecret(async () => {
      const token = await signSalesToken('rep');
      const session = await verifySalesRequest(requestWith(token));

      assert.ok(session, 'a freshly signed token should verify');
      assert.equal(session.role, 'rep');
      assert.ok(session.expiresAt > Date.now());
    });
  });

  it('round-trips a manager token and gives it a shorter life than a rep', async () => {
    await withSecret(async () => {
      const repSession = await verifySalesRequest(requestWith(await signSalesToken('rep')));
      const mgrSession = await verifySalesRequest(requestWith(await signSalesToken('manager')));

      assert.equal(mgrSession?.role, 'manager');
      // Reps must survive a two-day show; manager tokens carry comp data.
      assert.ok(
        (mgrSession as { expiresAt: number }).expiresAt <
          (repSession as { expiresAt: number }).expiresAt,
        'manager sessions should expire before rep sessions'
      );
    });
  });

  it('rejects a missing cookie', async () => {
    await withSecret(async () => {
      assert.equal(await verifySalesRequest(requestWith()), null);
    });
  });

  it('rejects a token signed with a different secret', async () => {
    await withSecret(async () => {
      const foreign = await new SignJWT({ role: 'manager', v: 1 })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject('sales')
        .setIssuer('yudezign')
        .setAudience('yudezign-sales-portal')
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode('some-other-secret'));

      assert.equal(await verifySalesRequest(requestWith(foreign)), null);
    });
  });

  it('rejects a correctly-signed token issued for a different audience', async () => {
    // This is what stops an admin token — including one minted from the
    // fallback secret committed in api/admin/auth.ts — being replayed here.
    await withSecret(async () => {
      const wrongAudience = await new SignJWT({ role: 'manager', v: 1 })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject('sales')
        .setIssuer('yudezign')
        .setAudience('yudezign-admin')
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(SECRET));

      assert.equal(await verifySalesRequest(requestWith(wrongAudience)), null);
    });
  });

  it('rejects a token from a retired session version', async () => {
    await withSecret(async () => {
      const stale = await new SignJWT({ role: 'rep', v: 0 })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject('sales')
        .setIssuer('yudezign')
        .setAudience('yudezign-sales-portal')
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(SECRET));

      assert.equal(await verifySalesRequest(requestWith(stale)), null);
    });
  });

  it('falls back to JWT_SECRET when SALES_JWT_SECRET is unset', async () => {
    const previous = { sales: process.env.SALES_JWT_SECRET, admin: process.env.JWT_SECRET };
    delete process.env.SALES_JWT_SECRET;
    process.env.JWT_SECRET = ADMIN_SECRET;
    try {
      const session = await verifySalesRequest(requestWith(await signSalesToken('rep')));
      assert.equal(session?.role, 'rep');
    } finally {
      process.env.SALES_JWT_SECRET = previous.sales;
      process.env.JWT_SECRET = previous.admin;
    }
  });

  it('throws when neither secret is set, rather than using a known default', async () => {
    const previous = { sales: process.env.SALES_JWT_SECRET, admin: process.env.JWT_SECRET };
    delete process.env.SALES_JWT_SECRET;
    delete process.env.JWT_SECRET;
    try {
      await assert.rejects(() => signSalesToken('rep'));
    } finally {
      process.env.SALES_JWT_SECRET = previous.sales;
      process.env.JWT_SECRET = previous.admin;
    }
  });

  it('accepts a live admin session, as manager', async () => {
    // "Can it just use the same admin login?" — yes, in this direction only.
    await withSecret(async () => {
      const session = await verifySalesRequest(requestWithAdmin(await adminToken(ADMIN_SECRET)));

      assert.equal(session?.role, 'manager');
      assert.equal(session?.via, 'admin');
    });
  });

  it('marks a portal login as coming from the portal', async () => {
    await withSecret(async () => {
      const session = await verifySalesRequest(requestWith(await signSalesToken('rep')));
      assert.equal(session?.via, 'sales');
    });
  });

  it('rejects an admin token signed with the wrong secret', async () => {
    await withSecret(async () => {
      const forged = await adminToken('not-the-admin-secret');
      assert.equal(await verifySalesRequest(requestWithAdmin(forged)), null);
    });
  });

  it('rejects an admin token that is not marked authenticated', async () => {
    await withSecret(async () => {
      const notAuthed = await new SignJWT({ authenticated: false })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(ADMIN_SECRET));

      assert.equal(await verifySalesRequest(requestWithAdmin(notAuthed)), null);
    });
  });

  it('prefers a portal session over an admin one when both are present', async () => {
    // A rep on a shared machine must not silently inherit manager access.
    await withSecret(async () => {
      const both = {
        cookies: {
          [SALES_COOKIE]: await signSalesToken('rep'),
          admin_token: await adminToken(ADMIN_SECRET),
        },
      } as never;

      const session = await verifySalesRequest(both);
      assert.equal(session?.role, 'rep');
      assert.equal(session?.via, 'sales');
    });
  });

  it('clears the admin cookie on sign-out too', () => {
    // Otherwise the gate re-accepts admin_token immediately and "Sign out"
    // visibly does nothing.
    const cleared = clearedAdminCookie();
    assert.match(cleared, /^admin_token=;/);
    assert.match(cleared, /Path=\//);
    assert.match(cleared, /Max-Age=0/);
  });

  it('sets the cookie flags the portal depends on', async () => {
    await withSecret(async () => {
      const cookie = sessionCookie(await signSalesToken('rep'), 'rep');

      assert.match(cookie, /^sales_token=/);
      assert.match(cookie, /HttpOnly/);
      // Scoped to the API so the public site's requests don't carry it.
      assert.match(cookie, /Path=\/api\/sales/);
      // Lax, not Strict: a manager texts reps this link, and Strict would not
      // send the cookie on that first cross-site navigation.
      assert.match(cookie, /SameSite=Lax/);
      assert.match(cookie, /Max-Age=2592000/);

      assert.match(clearedCookie(), /Max-Age=0/);
    });
  });
});

describe('password to role mapping', () => {
  const withEnv = (env: Record<string, string | undefined>, run: () => void) => {
    const previous = { ...process.env };
    Object.assign(process.env, env);
    try {
      run();
    } finally {
      process.env = previous;
    }
  };

  it('maps each password to its role', () => {
    withEnv({ SALES_REP_PASSWORD: 'rep-pw', SALES_MANAGER_PASSWORD: 'mgr-pw' }, () => {
      assert.equal(roleForPassword('rep-pw'), 'rep');
      assert.equal(roleForPassword('mgr-pw'), 'manager');
      assert.equal(roleForPassword('neither'), null);
    });
  });

  it('refuses manager access when both passwords are the same', () => {
    // Otherwise a copy-paste in the Vercel dashboard silently hands every rep
    // the compensation plan.
    withEnv({ SALES_REP_PASSWORD: 'same', SALES_MANAGER_PASSWORD: 'same' }, () => {
      assert.equal(roleForPassword('same'), 'rep');
    });
  });

  it('denies everything when no password is configured', () => {
    withEnv(
      { SALES_REP_PASSWORD: undefined, SALES_MANAGER_PASSWORD: undefined, ADMIN_PASSWORD: undefined },
      () => {
        assert.equal(roleForPassword('anything'), null);
        assert.equal(roleForPassword(''), null);
      }
    );
  });

  it('falls back to ADMIN_PASSWORD when SALES_REP_PASSWORD is unset', () => {
    // Temporary arrangement — see the comment in roleForPassword.
    withEnv(
      { SALES_REP_PASSWORD: undefined, SALES_MANAGER_PASSWORD: undefined, ADMIN_PASSWORD: 'admin-pw' },
      () => {
        assert.equal(roleForPassword('admin-pw'), 'rep');
        assert.equal(roleForPassword('something-else'), null);
      }
    );
  });

  it('stops using the admin fallback once SALES_REP_PASSWORD is set', () => {
    // The fallback must not linger as a second valid password after the reps
    // get their own — that would leave the admin credential opening /sales
    // forever with nobody realising.
    withEnv({ SALES_REP_PASSWORD: 'rep-pw', ADMIN_PASSWORD: 'admin-pw' }, () => {
      assert.equal(roleForPassword('rep-pw'), 'rep');
      assert.equal(roleForPassword('admin-pw'), null);
    });
  });

  it('never lets the admin password reach the manager tier', () => {
    withEnv(
      { SALES_REP_PASSWORD: undefined, SALES_MANAGER_PASSWORD: undefined, ADMIN_PASSWORD: 'admin-pw' },
      () => {
        assert.notEqual(roleForPassword('admin-pw'), 'manager');
      }
    );
  });
});
