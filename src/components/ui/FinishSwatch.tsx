import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Finish } from '../../types';

interface FinishSwatchProps {
  finish: Finish;
  isSelected?: boolean;
  onClick?: () => void;
}

const FinishSwatch = ({ finish, isSelected, onClick }: FinishSwatchProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`card p-4 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary shadow-xl' : ''
      }`}
      onClick={onClick}
    >
      {/* Color Swatch */}
      <div className="relative">
        <div
          className="w-full h-32 rounded-lg mb-3 shadow-inner"
          style={{ backgroundColor: finish.color }}
        >
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
      </div>

      {/* Info */}
      <div>
        <h4 className="font-semibold text-neutral-900 mb-1">{finish.name}</h4>
        <p className="text-sm text-neutral-600 capitalize mb-1">{finish.type.replace('-', ' ')}</p>
        {finish.description && (
          <p className="text-xs text-neutral-500">{finish.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default FinishSwatch;
