import React from 'react';

interface FilterButtonsProps {
  onFilterClick: (type: string) => void;
  onShowFilterDialog: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  onFilterClick,
  onShowFilterDialog
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        <button onClick={() => onFilterClick('weekly')} className="text-gray-600 hover:text-orange-500">
          周盈利之星
        </button>
        <button onClick={() => onFilterClick('monthly')} className="text-gray-600 hover:text-orange-500">
          月盈利龙虎榜
        </button>
        <button onClick={() => onFilterClick('sharpe')} className="text-gray-600 hover:text-orange-500">
          夏普严选
        </button>
        <button onClick={() => onFilterClick('conservative')} className="text-gray-600 hover:text-orange-500">
          保守型
        </button>
        <button onClick={() => onFilterClick('steady')} className="text-gray-600 hover:text-orange-500">
          稳健型
        </button>
        <button onClick={() => onFilterClick('aggressive')} className="text-gray-600 hover:text-orange-500">
          积极型
        </button>
        <button onClick={() => onFilterClick('progressive')} className="text-gray-600 hover:text-orange-500">
          进取型
        </button>
        <button onClick={() => onFilterClick('aum')} className="text-gray-600 hover:text-orange-500">
          资产规模
        </button>
      </div>
      
      <button
        onClick={onShowFilterDialog}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:border-orange-500 hover:text-orange-500"
      >
        <span>筛选</span>
      </button>
    </div>
  );
};