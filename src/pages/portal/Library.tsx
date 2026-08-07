import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import LinkCard from '../../components/portal/LinkCard';

const TABS = [
  { id: 'videos', label: 'Videos' },
  { id: 'documents', label: 'Documents' },
  { id: 'site', label: 'Our pages' },
];

/**
 * Sources.
 *
 * The training curriculum that used to be a tab here was removed on
 * 2026-08-07 — it was pinned to a specific onboarding week and went stale
 * immediately. Training is being handled outside this portal.
 */
const Library = () => {
  const { rep } = usePortal();
  const tab = useSubTab('videos');

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Sources</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          Where the product knowledge comes from, and what is safe to send a customer.
        </p>
      </header>

      <SubTabs tabs={TABS} defaultTab="videos" />

      {tab === 'videos' && (
        <div className="space-y-4">
          <p className="rounded-xl bg-white p-4 text-body-sm leading-relaxed text-luxury-gray-700 shadow-luxury-sm">
            {rep.library.warning}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {rep.library.videos.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div className="space-y-4">
          <p className="text-body-sm text-luxury-gray-600">
            Brochures are safe to send. Price lists are contractor pricing and go to trade accounts
            only — and a price list is not a quote.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {rep.library.documents.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      )}

      {tab === 'site' && (
        <div className="space-y-4">
          <p className="text-body-sm text-luxury-gray-600">
            Pages on yudezign.com you can send a customer to, or open in front of them.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {rep.library.siteLinks.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
