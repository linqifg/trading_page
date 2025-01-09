import React from 'react';
import { Header } from '../components/Header';
import { TraderCard } from '../components/TraderCard';
import { FilterButtons } from '../components/FilterButtons';
import { FilterDialog } from '../components/FilterDialog';
import { ChangePasswordDialog } from '../components/ChangePasswordDialog';
import { Pagination } from '../components/Pagination';
import { useTraders } from '../hooks/useTraders';
import { formatUniqueName } from '../utils/formatters';
import { FilterValues, FilterParams, QuickFilterType, QUICK_FILTER_CONFIGS } from '../types/filters';

export default function Dashboard() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = React.useState(false);
  const [bannerTitle, setBannerTitle] = React.useState('周盈利龙虎榜');
  const [filterParams, setFilterParams] = React.useState<FilterParams>({
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

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { traders, loading, error, pagination } = useTraders(filterParams);

  const handleFilterButtonClick = (type: QuickFilterType) => {
    const titles: Record<QuickFilterType, string> = {
      weekly: '周盈利龙虎榜',
      monthly: '月盈利龙虎榜',
      sharpe: '夏普严选',
      conservative: '保守型交易者',
      steady: '稳健型交易者',
      aggressive: '积极型交易者',
      progressive: '进取型交易者',
      aum: '资产规模排行'
    };
    setBannerTitle(titles[type]);

    // 更新筛选参数
    const config = QUICK_FILTER_CONFIGS[type];
    setFilterParams(prev => ({
      ...prev,
      ...config,
      page: 1,
      page_size: config.page_size,
      limit: config.limit
    }));
  };

  const handleFilterApply = (filters: FilterValues) => {
    setFilterParams(prev => ({
      ...prev,
      ...filters,
      page: 1
    }));
    setIsFilterDialogOpen(false);
    setBannerTitle('筛选结果');
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setFilterParams(prev => ({
      ...prev,
      page,
      page_size: pageSize
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMobile={isMobile} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        onChangePassword={() => setIsChangePasswordDialogOpen(true)}
      />

      <main className="pt-16">
        {/* Banner Section */}
        <section className="bg-gradient-to-r from-[#f08300] to-[#ffc180] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">合约跟单交易</h1>
                <p className="text-lg md:text-xl opacity-90">轻松复制顶级交易者策略</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-900 font-semibold mb-4">{bannerTitle}</h3>
                <div className="space-y-4">
                  {traders.slice(0, 3).map((trader, index) => (
                    <div key={index} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md">
                      <span className="text-[#f08300] font-bold">{index + 1}</span>
                      <div>
                        <div className="text-gray-900 font-medium">{formatUniqueName(trader.unique_name)}</div>
                        <div className="text-[#f08300]">
                          {trader.weekly_return >= 0 ? '+' : ''}{trader.weekly_return.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FilterButtons
          onFilterClick={handleFilterButtonClick}
          onShowFilterDialog={() => setIsFilterDialogOpen(true)}
        />

        <FilterDialog
          isOpen={isFilterDialogOpen}
          onClose={() => setIsFilterDialogOpen(false)}
          onApply={handleFilterApply}
          initialValues={{
            risk_level: '-',
            return_type: 'weekly',
            return_range: '0-1000',
            sharpe_ratio_range: '0-10',
            max_drawdown_range: '0-100'
          }}
        />

        <ChangePasswordDialog
          isOpen={isChangePasswordDialogOpen}
          onClose={() => setIsChangePasswordDialogOpen(false)}
          username={sessionStorage.getItem('username') || ''}
        />

        {/* Trader Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="text-center py-8">加载中...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {traders.map((trader, index) => (
                  <TraderCard key={index} trader={trader} />
                ))}
              </div>
              
              <Pagination
                total={pagination.total}
                current={pagination.current}
                pageSize={pagination.pageSize}
                onChange={handlePageChange}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}