import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { finishes } from '../../data/finishes';
import { finishStyles } from '../../data/finishStyles';
import { getVisibleStyles, getFinishesGroupedByStyle } from '../../lib/utils/finishesUtils';
import type { Finish } from '../../types';

interface FinishDropdownProps {
  value: string;
  onChange: (finishId: string, finishName: string) => void;
  error?: string;
}

const FinishDropdown = ({ value, onChange, error }: FinishDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visibleStyles = getVisibleStyles(finishStyles);
  const groupedFinishes = getFinishesGroupedByStyle(finishes, visibleStyles);

  const selectedFinish = finishes.find((f) => f.id === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (finish: Finish) => {
    onChange(finish.id, finish.name);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Cabinet Finish <span className="text-red-500">*</span>
      </label>

      {/* Dropdown trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-lg bg-white text-left
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          flex items-center justify-between transition-colors
          ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedFinish ? (
          <div className="flex items-center space-x-3">
            {selectedFinish.images?.[0] && (
              <img
                src={selectedFinish.images[0]}
                alt={selectedFinish.name}
                className="w-10 h-10 rounded object-cover border border-gray-200"
              />
            )}
            <span className="text-gray-900">{selectedFinish.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select a finish...</span>
        )}
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto"
            role="listbox"
          >
            {Array.from(groupedFinishes.entries()).map(([style, styleFinishes]) => {
              // Skip styles with no finishes
              if (styleFinishes.length === 0) return null;

              return (
                <div key={style.id}>
                  {/* Style group header */}
                  <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700 sticky top-0 border-b border-gray-100">
                    {style.name}
                  </div>

                  {/* Finish options with thumbnails */}
                  {styleFinishes.map((finish) => (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => handleSelect(finish)}
                      className={`w-full px-4 py-3 flex items-center space-x-3 transition-colors text-left
                        ${value === finish.id ? 'bg-primary/5' : 'hover:bg-gray-50'}
                      `}
                      role="option"
                      aria-selected={value === finish.id}
                    >
                      {finish.images?.[0] ? (
                        <img
                          src={finish.images[0]}
                          alt={finish.name}
                          className="w-12 h-12 rounded object-cover border border-gray-200"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded border border-gray-200"
                          style={{ backgroundColor: finish.color }}
                        />
                      )}
                      <span className="flex-1 text-gray-900">{finish.name}</span>
                      {value === finish.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinishDropdown;