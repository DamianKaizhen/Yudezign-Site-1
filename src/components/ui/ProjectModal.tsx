import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Package, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type MediaItem = { type: 'image' | 'video'; src: string };

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset to the first slide whenever a different project is opened.
  useEffect(() => {
    setCurrentIndex(0);
  }, [project?.id]);

  if (!project) return null;

  // Unified gallery: photos first, then any videos.
  const media: MediaItem[] = [
    ...project.images.map((src) => ({ type: 'image' as const, src })),
    ...(project.videos ?? []).map((src) => ({ type: 'video' as const, src })),
  ];
  const current = media[currentIndex] ?? media[0];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-luxury-gray-700" />
            </button>

            {/* Media Gallery (images + videos) */}
            <div className="relative aspect-[16/10] bg-luxury-gray-900">
              {current?.type === 'video' ? (
                <video
                  key={current.src}
                  src={current.src}
                  className="w-full h-full object-contain bg-black"
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={current?.src}
                  alt={`${project.title} - Image ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Navigation - Only show if multiple media items */}
              {media.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6 text-luxury-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6 text-luxury-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Media Counter */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {currentIndex + 1} / {media.length}
                  </div>

                  {/* Thumbnail Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {media.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-white w-6'
                            : `w-2 bg-white/50 hover:bg-white/75 ${item.type === 'video' ? 'ring-1 ring-white/70' : ''}`
                        }`}
                        aria-label={`Go to ${item.type} ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className="p-8">
              {/* Title and Location */}
              <div className="mb-6">
                <h2 className="text-h2 md:text-display-mobile font-medium text-luxury-gray-900 mb-3">
                  {project.title}
                </h2>
                {project.location && (
                  <div className="flex items-center gap-2 text-body text-luxury-gray-600">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    <span>{project.location}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-body-lg text-luxury-gray-700 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-luxury-cream rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-luxury-gray-500 mb-1">Turnaround Time</p>
                    <p className="text-body font-semibold text-luxury-gray-900">{project.turnaroundTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Package className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-luxury-gray-500 mb-1">Finish</p>
                    <p className="text-body font-semibold text-luxury-gray-900">{project.finish}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-luxury-gray-500 mb-1">Style</p>
                    <p className="text-body font-semibold text-luxury-gray-900">{project.cabinetStyle}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-h4 font-medium text-luxury-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-body text-luxury-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 border-t border-luxury-gray-100">
                <a
                  href="/contact"
                  className="inline-block w-full md:w-auto px-8 py-3 bg-primary text-white text-body-lg font-medium rounded-md hover:bg-primary-light transition-all duration-300 shadow-luxury hover:shadow-luxury-lg text-center"
                >
                  Start Your Project
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
