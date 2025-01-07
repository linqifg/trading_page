import React from 'react';

interface RangeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 1
}) => {
  const [minValue, maxValue] = value.split('-').map(Number);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxValue);
    onChange(`${newMin}-${maxValue}`);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minValue);
    onChange(`${minValue}-${newMax}`);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="w-24 px-3 py-2 border rounded-md"
        />
        <span>-</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="w-24 px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};