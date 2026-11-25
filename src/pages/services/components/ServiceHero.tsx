import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import type { ServiceData } from '../../../types';

interface ServiceHeroProps {
  service: ServiceData;
}

type HeroFeature = string | { title: string };

/**
 * Editorial split hero: text on the left, aligned to the site container; the
 * photo runs to the top, right and bottom edges. On phones the photo stacks
 * under the text and the main button spans the width. Styles: `.g-hero*` in
 * index.css.
 */
const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  const features: HeroFeature[] = Array.isArray(service.features)
    ? service.features.slice(0, 4)
    : [];

  return (
    <section className="g-hero">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Text */}
        <div className="flex w-full min-w-0 flex-col gap-7 px-4 pb-12 pt-28 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-32 lg:ml-auto lg:max-w-[640px] lg:pb-20 lg:pt-36 lg:pl-8 lg:pr-12">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="g-hero-eyebrow">Services</p>
            <h1 className="g-hero-title">{service.name}</h1>
          </div>

          <p className="g-hero-lede">{service.overview}</p>

          {features.length > 0 && (
            <ul className="g-hero-list max-sm:order-1">
              {features.map((feature, idx) => (
                <li key={idx}>
                  <span className="g-hero-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{typeof feature === 'string' ? feature : feature.title}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="g-hero-actions">
            <a href="/contact" className="g-btn">
              Get free consultation
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            {service.portfolioCategory && (
              <a href={`/portfolio/${service.portfolioCategory}`} className="g-link">
                View our work
              </a>
            )}
            <a href="tel:+17135020399" className="g-tel">
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              (713) 502-0399
            </a>
          </div>

          <dl className="g-hero-facts max-sm:order-2 lg:mt-auto lg:pt-2">
            <div>
              <dt className="g-hero-fact-label">Lead time, from</dt>
              <dd className="g-hero-fact-value">2 weeks</dd>
            </div>
            <div>
              <dt className="g-hero-fact-label">Pricing</dt>
              <dd className="g-hero-fact-value is-gold italic">By quote</dd>
            </div>
          </dl>
        </div>

        {/* Photo */}
        <div className="relative h-[72vw] max-h-[520px] min-h-[260px] lg:h-auto lg:max-h-none lg:min-h-[560px]">
          <img
            src={service.heroImage}
            alt={service.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
