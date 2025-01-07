export interface FilterValues {
  risk_level: string;
  return_type: string;
  return_range: string;
  sharpe_ratio_range: string;
  max_drawdown_range: string;
}

export interface FilterParams extends FilterValues {
  order_by?: string;
  order?: string;
  limit?: string;
  page?: number;
  page_size?: number;
}

export type QuickFilterType = 
  | 'weekly'
  | 'monthly'
  | 'sharpe'
  | 'conservative'
  | 'steady'
  | 'aggressive'
  | 'progressive'
  | 'aum';

export interface QuickFilterConfig {
  order_by: string;
  order: string;
  max_drawdown_range?: string;
  page_size?: number;
}

export const QUICK_FILTER_CONFIGS: Record<QuickFilterType, QuickFilterConfig> = {
  weekly: { order_by: 'weekly_return', order: 'DESC', max_drawdown_range: '', page_size: 30 },
  monthly: { order_by: 'monthly_return', order: 'DESC', max_drawdown_range: '', page_size: 30 },
  sharpe: { order_by: 'sharpe_ratio', order: 'DESC', max_drawdown_range: '', page_size: 30 },
  conservative: { order_by: 'monthly_return', order: 'DESC', max_drawdown_range: '0-1', page_size: 30 },
  steady: { order_by: 'monthly_return', order: 'DESC', max_drawdown_range: '1-5', page_size: 30 },
  aggressive: { order_by: 'sharpe_ratio', order: 'DESC', max_drawdown_range: '5-20', page_size: 30 },
  progressive: { order_by: 'sharpe_ratio', order: 'DESC', max_drawdown_range: '20-40', page_size: 30 },
  aum: { order_by: 'aum', order: 'DESC', max_drawdown_range: '', page_size: 30 }
};