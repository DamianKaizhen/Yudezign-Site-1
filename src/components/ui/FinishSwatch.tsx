import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ZoomIn } from 'lucide-react';
import { finishStyles } from '../../data/finishStyles';
import { getStyleById } from '../../lib/utils/finishesUtils';
import { ImageLightbox } from './ImageLightbox';
import type { Finish } from '../../types';

interface FinishSwatchProps {
  finish: Finish;
  isSelected?: boolean;
  onClick?: () => void;
  enableLightbox?: boolean; // Enable click-to-enlarge for images
}

const FinishSwatch = ({ finish, isSelected, onClick, enableLightbox = false }: FinishSwatchProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Get the style name for this finish
  const style = getStyleById(finish.styleId, finishStyles);

  const hasImages = finish.images && finish.images.length > 0;

  const handleCardClick = () => {
    if (enableLightbox && hasImages) {
      setLightboxOpen(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`card p-4 cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-primary shadow-xl' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Finish Image or Color Swatch */}
        <div className="relative">
          {hasImages ? (
            // Display actual finish image
            <div className="w-full h-32 rounded-lg mb-3 shadow-inner overflow-hidden relative group">
              <img
                src={finish.images[0]}
                alt={finish.name}
                className="w-full h-full object-cover"
              />
              {/* Zoom indicator when lightbox is enabled */}
              {enableLightbox && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          ) : (
            // Fallback to color swatch
            <div
              className="w-full h-32 rounded-lg mb-3 shadow-inner"
              style={{ backgroundColor: finish.color }}
            />
          )}
        {/* In Stock Badge */}
        {finish.inStock && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            In Stock
          </div>
        )}
        {!finish.inStock && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Special Order
          </div>
        )}
        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="bg-white rounded-full p-2">
              <Check className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h4 className="font-semibold text-neutral-900 mb-1">{finish.name}</h4>
        {style && (
          <p className="text-sm text-neutral-600 mb-1">{style.name}</p>
        )}
        {finish.description && (
          <p className="text-xs text-neutral-500">{finish.description}</p>
        )}
      </div>
    </motion.div>

    {/* Image Lightbox */}
    {enableLightbox && hasImages && (
      <ImageLightbox
        images={finish.images}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={finish.name}
      />
    )}
  </>
  );
};

export default FinishSwatch;
