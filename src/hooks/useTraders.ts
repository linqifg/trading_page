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
        // 重置错误状态和加载状态
        setError(null);
        setLoading(true);

        const queryParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            if (key === 'limit' && value !== 0) {
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
          // 如果响应不是 200，尝试解析错误信息
          try {
            const errorData = await response.json();
            throw new Error(errorData.message || `请求失败 (${response.status})`);
          } catch (e) {
            // 如果无法解析 JSON，使用通用错误信息
            throw new Error(`请求失败 (${response.status})`);
          }
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
            pageSize: params.limit || params.page_size || 30
          });
          // 成功后清除错误状态
          setError(null);
        } else {
          throw new Error(data.message || '请求失败');
        }
      } catch (err) {
        // 设置具体的错误信息
        setError(err instanceof Error ? err.message : '请求失败');
        // 当发生错误时，保持之前的数据不变
        // setTraders([]);  // 注释掉这行，不清空之前的数据
      } finally {
        setLoading(false);
      }
    };

    fetchTraders();
  }, [params]);

  return { traders, loading, error, pagination };
};