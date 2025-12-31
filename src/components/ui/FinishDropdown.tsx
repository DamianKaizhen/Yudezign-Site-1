import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X, Plus } from 'lucide-react';
import { finishes } from '../../data/finishes';
import { finishStyles } from '../../data/finishStyles';
import { getVisibleStyles, getFinishesGroupedByStyle } from '../../lib/utils/finishesUtils';
import type { Finish } from '../../types';

interface FinishSelection {
  id: string;
  name: string;
  imageUrl: string;
}

interface FinishDropdownProps {
  value: FinishSelection[];
  onChange: (selections: FinishSelection[]) => void;
  error?: string;
  maxSelections?: number;
}

const FinishDropdown = ({ value, onChange, error, maxSelections = 2 }: FinishDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visibleStyles = getVisibleStyles(finishStyles);
  const groupedFinishes = getFinishesGroupedByStyle(finishes, visibleStyles);

  const selectedIds = value.map((v) => v.id);

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
    const isSelected = selectedIds.includes(finish.id);

    if (isSelected) {
      // Remove from selection
      onChange(value.filter((v) => v.id !== finish.id));
    } else if (value.length < maxSelections) {
      // Add to selection
      onChange([
        ...value,
        {
          id: finish.id,
          name: finish.name,
          imageUrl: finish.images?.[0] || '',
        },
      ]);
    }
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v.id !== id));
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Cabinet Finish{value.length < maxSelections ? 'es' : ''} <span className="text-red-500">*</span>
        <span className="text-gray-400 font-normal ml-2">
          (Select 1-{maxSelections} {maxSelections === 1 ? 'color' : 'colors'})
        </span>
      </label>

      {/* Selected finishes display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((selection, index) => (
            <motion.div
              key={selection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2"
            >
              <span className="text-xs font-medium text-primary/60 uppercase">
                {index === 0 ? 'Primary' : 'Secondary'}
              </span>
              {selection.imageUrl && (
                <img
                  src={selection.imageUrl}
                  alt={selection.name}
                  className="w-8 h-8 rounded object-cover border border-primary/20"
                />
              )}
              <span className="text-sm font-medium text-gray-900">{selection.name}</span>
              <button
                type="button"
                onClick={(e) => handleRemove(selection.id, e)}
                className="p-1 hover:bg-primary/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dropdown trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-4 border-2 border-dashed rounded-xl bg-gradient-to-br from-gray-50 to-white
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
          flex items-center justify-center gap-3 transition-all duration-200
          ${error ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-primary/50 hover:bg-primary/5'}
          ${value.length >= maxSelections ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={value.length >= maxSelections}
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary" />
        </div>
        <span className="text-gray-600 font-medium">
          {value.length === 0
            ? 'Click to select cabinet finish'
            : value.length < maxSelections
              ? 'Add another finish (optional)'
              : 'Maximum finishes selected'}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[400px] overflow-hidden"
            role="listbox"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-primary to-primary-light text-white px-4 py-3">
              <p className="text-sm font-medium">
                {value.length === 0
                  ? 'Select your primary finish'
                  : `Selected ${value.length} of ${maxSelections}`}
              </p>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[340px]">
              {Array.from(groupedFinishes.entries()).map(([style, styleFinishes]) => {
                // Skip styles with no finishes
                if (styleFinishes.length === 0) return null;

                return (
                  <div key={style.id}>
                    {/* Style group header */}
                    <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold text-gray-700 sticky top-0 border-b border-gray-100">
                      {style.name}
                    </div>

                    {/* Finish options grid */}
                    <div className="p-2 grid grid-cols-2 gap-2">
                      {styleFinishes.map((finish) => {
                        const isSelected = selectedIds.includes(finish.id);
                        const isDisabled = !isSelected && value.length >= maxSelections;

                        return (
                          <button
                            key={finish.id}
                            type="button"
                            onClick={() => !isDisabled && handleSelect(finish)}
                            className={`group relative p-3 rounded-xl transition-all duration-200 text-left
                              ${isSelected
                                ? 'bg-primary/10 ring-2 ring-primary shadow-md'
                                : isDisabled
                                  ? 'opacity-40 cursor-not-allowed bg-gray-50'
                                  : 'hover:bg-gray-50 hover:shadow-md'
                              }
                            `}
                            role="option"
                            aria-selected={isSelected}
                            disabled={isDisabled}
                          >
                            <div className="flex items-center gap-3">
                              {finish.images?.[0] ? (
                                <img
                                  src={finish.images[0]}
                                  alt={finish.name}
                                  className={`w-14 h-14 rounded-lg object-cover border-2 transition-all
                                    ${isSelected ? 'border-primary shadow-lg' : 'border-gray-200 group-hover:border-gray-300'}
                                  `}
                                />
                              ) : (
                                <div
                                  className={`w-14 h-14 rounded-lg border-2 transition-all
                                    ${isSelected ? 'border-primary shadow-lg' : 'border-gray-200'}
                                  `}
                                  style={{ backgroundColor: finish.color }}
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                  {finish.name}
                                </p>
                                {finish.inStock && (
                                  <span className="text-xs text-green-600">In Stock</span>
                                )}
                              </div>
                            </div>

                            {/* Selection indicator */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                              >
                                <Check className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {value.length === 0 ? 'At least 1 required' : `${value.length} selected`}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinishDropdown;