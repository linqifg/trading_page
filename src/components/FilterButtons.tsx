import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface FilterButtonsProps {
  onFilterClick: (type: string) => void;
  onShowFilterDialog: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  onFilterClick,
  onShowFilterDialog
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('weekly');

  const handleFilterClick = (type: string) => {
    setActiveFilter(type);
    onFilterClick(type);
  };

  const filterButtons = [
    { type: 'weekly', label: '周盈利之星' },
    { type: 'monthly', label: '月盈利龙虎榜' },
    { type: 'sharpe', label: '夏普严选' },
    { type: 'conservative', label: '保守型' },
    { type: 'steady', label: '稳健型' },
    { type: 'aggressive', label: '积极型' },
    { type: 'progressive', label: '进取型' },
    { type: 'aum', label: '资产规模' }
  ];

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {filterButtons.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleFilterClick(type)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200
                  ${activeFilter === type
                    ? 'bg-orange-50 text-orange-500 border-2 border-orange-500'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
          
          <button
            onClick={onShowFilterDialog}
            className="flex items-center gap-2 px-4 py-2 ml-4 border border-gray-200 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors whitespace-nowrap"
          >
            <Filter size={18} />
            <span>筛选</span>
          </button>
        </div>
      </div>
    </div>
  );
};