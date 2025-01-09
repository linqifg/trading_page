export interface Trader {
  unique_name: string;
  exchange: string;
  run_len: number;
  risk_level: string;
  weekly_return: number;
  monthly_return: number;
  anual_return: number;
  aum: number;
  max_drawdown: number;
  sharpe_ratio: number;
  link: string;
}

export interface TraderResponse {
  code: number;
  data: Trader[];
  count: number;
  page: number;
  page_size: number;
  message?: string;
}

export interface UseTraderParams {
  risk_level?: string;
  return_type?: string;
  return_range?: string;
  sharpe_ratio_range?: string;
  max_drawdown_range?: string;
  order_by?: string;
  order?: string;
  limit?: number;
  page?: number;
  page_size?: number;
}