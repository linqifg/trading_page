import { useState, useCallback } from 'react';
import { FilterParams } from '../types/filters';

export const useFilteredTraders = () => {
  const [filterParams, setFilterParams] = useState<FilterParams>({
    risk_level: '',
    return_type: '',
    return_range: '',
    sharpe_ratio_range: '',
    max_drawdown_range: '',
    order_by: 'weekly_return',
    order: 'DESC',
    page: 1,
    page_size: 30
  });

  const handleQuickFilter = useCallback((type: string) => {
    const newParams: Partial<FilterParams> = {
      page: 1,
      page_size: 30
    };

    switch (type) {
      case 'weekly':
        newParams.order_by = 'weekly_return';
        newParams.order = 'DESC';
        newParams.limit = '15';
        break;
      case 'monthly':
        newParams.order_by = 'monthly_return';
        newParams.order = 'DESC';
        newParams.limit = '15';
        break;
      case 'sharpe':
        newParams.order_by = 'sharpe_ratio';
        newParams.order = 'DESC';
        newParams.limit = '15';
        break;
      case 'conservative':
        newParams.max_drawdown_range = '0-1';
        newParams.order_by = 'monthly_return';
        newParams.order = 'DESC';
        break;
      case 'steady':
        newParams.max_drawdown_range = '1-5';
        newParams.order_by = 'monthly_return';
        newParams.order = 'DESC';
        break;
      case 'aggressive':
        newParams.max_drawdown_range = '5-20';
        newParams.order_by = 'sharpe_ratio';
        newParams.order = 'DESC';
        break;
      case 'progressive':
        newParams.max_drawdown_range = '20-40';
        newParams.order_by = 'sharpe_ratio';
        newParams.order = 'DESC';
        break;
      case 'aum':
        newParams.order_by = 'aum';
        newParams.order = 'DESC';
        newParams.limit = '15';
        break;
    }

    setFilterParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return {
    filterParams,
    setFilterParams,
    handleQuickFilter
  };
};