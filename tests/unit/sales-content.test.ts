import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SignJWT } from 'jose';

import { buildPayload, repContent, CONTENT_VERSION } from '../../api/_content/index.ts';
import { MANAGER_CANARIES } from '../../api/_content/manager.ts';
import {
  SALES_COOKIE,
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

  const withSecret = async (run: () => Promise<void>) => {
    const previous = process.env.SALES_JWT_SECRET;
    process.env.SALES_JWT_SECRET = SECRET;
    try {
      await run();
    } finally {
      process.env.SALES_JWT_SECRET = previous;
    }
  };

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

  it('throws rather than falling back when the secret is unset', async () => {
    const previous = process.env.SALES_JWT_SECRET;
    delete process.env.SALES_JWT_SECRET;
    try {
      await assert.rejects(() => signSalesToken('rep'));
    } finally {
      process.env.SALES_JWT_SECRET = previous;
    }
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
