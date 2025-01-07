import { useState, useEffect } from 'react';
import { Trader, TraderResponse, UseTraderParams } from '../types/trader';

const API_BASE_URL = 'http://ec2-54-255-48-212.ap-southeast-1.compute.amazonaws.com:8989';

export const useTraders = (params: UseTraderParams) => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 30
  });

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            if (key === 'limit') {
              queryParams.append('limit', value.toString());
            } else if (key === 'return_range' || key === 'sharpe_ratio_range' || key === 'max_drawdown_range') {
              queryParams.append(key, value.toString());
            } else if (key === 'page' || key === 'page_size') {
              queryParams.append(key, value.toString());
            } else if (value) {
              queryParams.append(key, value.toString());
            }
          }
        });

        const response = await fetch(
          `${API_BASE_URL}/product_info?${queryParams}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TraderResponse = await response.json();

        if (data.code === 0) {
          const processedData = data.data.map(trader => ({
            ...trader,
            weekly_return: Number(trader.weekly_return),
            monthly_return: Number(trader.monthly_return),
            anual_return: Number(trader.anual_return),
            max_drawdown: Number(trader.max_drawdown),
            sharpe_ratio: Number(trader.sharpe_ratio),
            aum: Number(trader.aum),
            run_len: Number(trader.run_len)
          }));
          setTraders(processedData);
          setPagination({
            total: data.count,
            current: params.page || 1,
            pageSize: params.page_size || 30
          });
        } else {
          throw new Error(data.message || '请求失败');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '请求失败');
      } finally {
        setLoading(false);
      }
    };

    fetchTraders();
  }, [params]);

  return { traders, loading, error, pagination };
};