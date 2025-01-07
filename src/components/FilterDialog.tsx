import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FilterValues } from '../types/filters';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  initialValues: FilterValues;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  onApply,
  initialValues
}) => {
  const [filters, setFilters] = useState<FilterValues>(initialValues);

  useEffect(() => {
    setFilters(initialValues);
  }, [initialValues]);

  const handleReset = () => {
    setFilters({
      risk_level: '-',
      return_type: 'weekly',
      return_range: '0-1000',
      sharpe_ratio_range: '0-10',
      max_drawdown_range: '0-100'
    });
  };

  const handleRangeChange = (field: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">筛选条件</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Risk Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">风险等级</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: '-', label: '所有' },
                  { value: '1-low', label: '低' },
                  { value: '2-middle', label: '中' },
                  { value: '3-high', label: '高' }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`px-4 py-2 rounded-md text-sm ${
                      filters.risk_level === option.value
                        ? 'bg-orange-100 text-orange-500 border border-orange-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleRangeChange('risk_level', option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Return Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">收益率类型</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'weekly', label: '周收益率' },
                  { value: 'monthly', label: '月收益率' },
                  { value: 'quarterly', label: '季收益率' },
                  { value: 'anual', label: '年收益率' }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`px-4 py-2 rounded-md text-sm ${
                      filters.return_type === option.value
                        ? 'bg-orange-100 text-orange-500 border border-orange-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleRangeChange('return_type', option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Range Inputs */}
            {[
              { field: 'return_range', label: '收益率范围 (%)', min: 0, max: 1000 },
              { field: 'sharpe_ratio_range', label: '夏普率范围', min: 0, max: 10 },
              { field: 'max_drawdown_range', label: '最大回撤范围 (%)', min: 0, max: 100 }
            ].map(({ field, label, min, max }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={min}
                    max={max}
                    value={filters[field as keyof FilterValues].split('-')[0]}
                    onChange={(e) => handleRangeChange(field as keyof FilterValues, `${e.target.value}-${filters[field as keyof FilterValues].split('-')[1]}`)}
                    className="w-24 px-3 py-2 border rounded-md"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    value={filters[field as keyof FilterValues].split('-')[1]}
                    onChange={(e) => handleRangeChange(field as keyof FilterValues, `${filters[field as keyof FilterValues].split('-')[0]}-${e.target.value}`)}
                    className="w-24 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              重置
            </button>
            <button
              onClick={() => onApply(filters)}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              应用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};