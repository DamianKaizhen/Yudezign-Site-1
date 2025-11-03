import React, { useState } from 'react';
import { Pipette } from 'lucide-react';
import { FormField } from './FormField';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  required?: boolean;
  error?: string;
}

/**
 * ColorPicker - Color selection component with preview and hex input
 * Allows selecting colors via native picker or manual hex input
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
}) => {
  const [hexInput, setHexInput] = useState(value);

  // Common preset colors for quick selection
  const presetColors = [
    '#FFFFFF', '#000000', '#808080', '#C0C0C0', '#F5F5DC',
    '#DEB887', '#5C4033', '#8B4513', '#420D09', '#B8860B',
    '#3C3C3C', '#D3D3D3', '#A8A8A8', '#1C1C1C', '#E8DCC4',
  ];

  const handleHexInput = (hex: string) => {
    setHexInput(hex);
    // Validate hex color format
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  const handleColorPickerChange = (color: string) => {
    setHexInput(color);
    onChange(color);
  };

  return (
    <FormField label={label} error={error} required={required}>
      <div className="space-y-4">
        {/* Color Preview and Native Picker */}
        <div className="flex items-center gap-4">
          {/* Color Preview Swatch */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-lg border-2 border-luxury-sand shadow-inner"
              style={{ backgroundColor: value }}
            >
              {/* Checkered background for transparency */}
              <div className="absolute inset-0 -z-10 rounded-lg bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc)] bg-[length:20px_20px] bg-[0_0,10px_10px]" />
            </div>
          </div>

          {/* Native Color Picker */}
          <div className="flex-1">
            <label className="block">
              <div className="flex items-center gap-2 mb-2 text-sm text-luxury-gray-700">
                <Pipette className="w-4 h-4" />
                <span>Pick a color</span>
              </div>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorPickerChange(e.target.value)}
                className="w-full h-12 rounded-md border border-luxury-sand cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Hex Input */}
        <div>
          <label className="block text-sm text-luxury-gray-700 mb-2">
            Hex Color Code
          </label>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInput(e.target.value.toUpperCase())}
            placeholder="#000000"
            maxLength={7}
            className={`
              w-full px-4 py-3 rounded-md border font-mono
              ${error ? 'border-red-500' : 'border-luxury-sand'}
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              transition-all duration-200
            `}
          />
          <p className="text-xs text-luxury-gray-500 mt-1">
            Format: #RRGGBB (e.g., #FF5733)
          </p>
        </div>

        {/* Preset Colors */}
        <div>
          <label className="block text-sm text-luxury-gray-700 mb-2">
            Quick Select
          </label>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorPickerChange(color)}
                className={`
                  w-full aspect-square rounded-md border-2 transition-all
                  ${value === color ? 'border-primary scale-110 shadow-lg' : 'border-luxury-sand hover:border-primary/50'}
                `}
                style={{ backgroundColor: color }}
                title={color}
              >
                <span className="sr-only">{color}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </FormField>
  );
};
