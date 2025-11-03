import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-lg transition-all"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/50 text-white rounded-lg text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Title */}
        {title && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 px-6 py-3 bg-black/50 text-white rounded-lg text-lg font-medium">
            {title}
          </div>
        )}

        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-6 z-10 p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-lg transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 z-10 p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-lg transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Main image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`${title || 'Image'} ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 px-4 py-3 bg-black/50 rounded-lg max-w-[90vw] overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-white scale-110'
                    : 'border-white/30 hover:border-white/60 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
