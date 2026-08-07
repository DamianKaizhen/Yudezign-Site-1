import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import LinkCard from '../../components/portal/LinkCard';

const TABS = [
  { id: 'videos', label: 'Videos' },
  { id: 'documents', label: 'Documents' },
  { id: 'training', label: 'Training' },
];

const Library = () => {
  const { rep } = usePortal();
  const tab = useSubTab('videos');

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Library</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          Ten videos, the shared folders, and the training week.
        </p>
      </header>

      <SubTabs tabs={TABS} defaultTab="videos" />

      {tab === 'videos' && (
        <div className="space-y-4">
          <p className="rounded-xl bg-white p-4 text-body-sm leading-relaxed text-luxury-gray-700 shadow-luxury-sm">
            These are third-party explainers, chosen because they show a concept clearly — not
            because they show how we work. Several demonstrate methods we deliberately don&rsquo;t
            use, and where that is true it is flagged.{' '}
            <strong>If a video contradicts the Answer Key, the Answer Key wins.</strong>
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {rep.library.videos.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {rep.library.documents.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      )}

      {tab === 'training' && (
        <div className="space-y-3">
          {rep.library.curriculum.map((module) => (
            <article
              key={module.id}
              id={module.id}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-5 shadow-luxury-sm"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent-dark">
                {module.week}
              </p>
              <h2 className="mt-0.5 font-semibold text-luxury-gray-900">{module.title}</h2>

              <ul className="mt-3 space-y-1.5">
                {module.objectives.map((objective, i) => (
                  <li key={i} className="flex gap-2.5 text-body-sm text-luxury-gray-700">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"
                    />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>

              {module.assessment && (
                <p className="mt-3 rounded-lg bg-luxury-beige p-3 text-body-sm text-luxury-gray-800">
                  <span className="font-semibold">Gate: </span>
                  {module.assessment}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
