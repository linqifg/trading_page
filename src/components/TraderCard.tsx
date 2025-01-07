import React from 'react';

interface TraderCardProps {
  trader: {
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
  };
}

export const TraderCard: React.FC<TraderCardProps> = ({ trader }) => {
  const getRiskLevelText = (level: string) => {
    const riskLevels: Record<string, string> = {
      '1-low': '低风险',
      '2-middle': '中风险',
      '3-high': '高风险'
    };
    return riskLevels[level] || '未知';
  };

  const getReturnColor = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '#888888';
    }
    const numValue = Number(value);
    return numValue >= 0 ? '#f08300' : '#f6465d';
  };

  const getReturnText = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '0.00%';
    }
    const numValue = Number(value);
    return `${numValue >= 0 ? '+' : ''}${numValue.toFixed(2)}%`;
  };

  return (
    <a href={trader.link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgLz48L3N2Zz4="
            className="w-12 h-12 rounded-full"
            alt="Avatar"
          />
          <div className="ml-4">
            <div className="text-lg font-semibold">{trader.unique_name}</div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>{trader.exchange}</span>
              <span className="mx-2">•</span>
              <span>{trader.run_len}天</span>
              <span className="mx-2">•</span>
              <span className={`px-2 py-1 rounded text-xs ${
                trader.risk_level === '1-low' ? 'bg-green-100 text-green-800' :
                trader.risk_level === '2-middle' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {getRiskLevelText(trader.risk_level)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-600">7日收益率</div>
            <div className="text-2xl font-bold" style={{ color: getReturnColor(trader.weekly_return) }}>
              {getReturnText(trader.weekly_return)}
            </div>
          </div>
          <div className="w-32 h-16">
            <img src={`./pic/${trader.unique_name}.png`} alt="趋势图" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600">资产管理规模</div>
            <div className="text-lg font-semibold">{parseInt(String(trader.aum)).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">7天最大回撤</div>
            <div className="text-lg font-semibold">{getReturnText(trader.max_drawdown)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">夏普比率</div>
            <div className="text-lg font-semibold">{Number(trader.sharpe_ratio).toFixed(2)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600">月收益率</div>
            <div className="text-lg font-semibold" style={{ color: getReturnColor(trader.monthly_return) }}>
              {getReturnText(trader.monthly_return)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">年收益率</div>
            <div className="text-lg font-semibold" style={{ color: getReturnColor(trader.anual_return) }}>
              {getReturnText(trader.anual_return)}
            </div>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-200">
          跟单
        </button>
      </div>
    </a>
  );
};