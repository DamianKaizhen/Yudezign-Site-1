import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import type { LocationData } from '../../../types';

interface LocationHeroProps {
  location: LocationData;
}

/**
 * Editorial split hero for the location pages: text on the left, a service-area
 * panel running to the right edge. Stacks on phones. Styles: `.g-hero*` in
 * index.css.
 */
const LocationHero: React.FC<LocationHeroProps> = ({ location }) => {
  return (
    <section className="g-hero">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Text */}
        <div className="flex w-full min-w-0 flex-col gap-7 px-4 pb-12 pt-28 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-32 lg:ml-auto lg:max-w-[640px] lg:pb-20 lg:pt-36 lg:pl-8 lg:pr-12">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="g-hero-eyebrow">Service area</p>
            <h1 className="g-hero-title g-hero-title-sm">
              Custom Cabinets in <br />
              {location.name}, Texas
            </h1>
          </div>

          <p className="g-hero-lede">{location.metaDescription}</p>

          <div className="g-hero-actions">
            <a href="/contact" className="g-btn">
              Get free consultation
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href="tel:+17135020399" className="g-tel">
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              (713) 502-0399
            </a>
          </div>

          <dl className="g-hero-facts lg:mt-auto lg:pt-2">
            <div>
              <dt className="g-hero-fact-label">Projects</dt>
              <dd className="g-hero-fact-value is-gold">500+</dd>
            </div>
            <div>
              <dt className="g-hero-fact-label">Years</dt>
              <dd className="g-hero-fact-value is-gold">15+</dd>
            </div>
            <div>
              <dt className="g-hero-fact-label">Rated</dt>
              <dd className="g-hero-fact-value is-gold">5★</dd>
            </div>
          </dl>
        </div>

        {/* Service area panel */}
        <div className="g-hero-panel">
          <div className="flex h-full w-full flex-col justify-center gap-7 px-4 py-12 sm:px-6 sm:py-14 lg:max-w-[640px] lg:px-16 lg:py-20">
            <div className="flex flex-col gap-2">
              <h2 className="g-hero-h2">Proudly serving {location.name}</h2>
              <p className="g-hero-lede">
                &amp; {location.neighborhoods.length} surrounding neighborhoods
              </p>
            </div>

            <ul className="g-hero-list is-single">
              <li>
                <span className="g-hero-num" aria-hidden="true">01</span>
                <span>
                  In-Home Consultations
                  <span className="g-hero-note">We come to you for free design meetings</span>
                </span>
              </li>
              <li>
                <span className="g-hero-num" aria-hidden="true">02</span>
                <span>
                  Professional Installation
                  <span className="g-hero-note">Expert installation by our local team</span>
                </span>
              </li>
            </ul>

            <p className="g-hero-note">
              Houston-based workshop • Local expertise since 2019
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
