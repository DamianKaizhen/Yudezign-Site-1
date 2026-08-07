import type { PortalDoc } from '../../types/salesPortal';

/**
 * Renders a PortalDoc — the escape hatch for genuinely narrative passages.
 *
 * Structured paragraphs rather than markdown, deliberately: rendering markdown
 * would mean shipping a parser to a phone on expo wifi, and searching rendered
 * prose returns "this page contains your word" instead of the answer.
 */
const DocView = ({ doc, className = '' }: { doc: PortalDoc; className?: string }) => (
  <article id={doc.id} className={`scroll-mt-32 ${className}`}>
    <h2 className="text-h4 font-medium text-luxury-gray-900">{doc.title}</h2>
    {doc.summary && (
      <p className="mt-2 text-body-sm leading-relaxed text-luxury-gray-600">{doc.summary}</p>
    )}

    <div className="mt-5 space-y-6">
      {doc.sections.map((section, i) => (
        <section key={section.heading ?? `section-${i}`}>
          {section.heading && (
            <h3 className="mb-2 text-body font-semibold text-luxury-gray-900">{section.heading}</h3>
          )}

          {section.paragraphs?.map((paragraph, j) => (
            <p
              key={`p-${j}`}
              className="mb-2 text-body-sm leading-relaxed text-luxury-gray-700 last:mb-0"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {section.bullets.map((bullet, j) => (
                <li
                  key={`b-${j}`}
                  className="flex gap-2.5 text-body-sm leading-relaxed text-luxury-gray-700"
                >
                  <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {section.callout && (
            <p className="mt-3 border-l-4 border-accent bg-white p-4 text-body-sm font-medium leading-relaxed text-luxury-gray-900 shadow-luxury-sm">
              {section.callout}
            </p>
          )}
        </section>
      ))}
    </div>
  </article>
);

export default DocView;
