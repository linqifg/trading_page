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
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 广告数据
const advertisements = [
  {
    id: 1,
    title: "新用户专享优惠",
    description: "首次跟单享受0手续费",
    pic: "/img/1.png",
    link: "#"
  },
  {
    id: 2,
    title: "风险管理课程",
    description: "专业交易者带你掌握风控要点",
    pic: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "高手经验分享",
    description: "顶级交易者每周在线分享",
    pic: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

export default function Dashboard() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = React.useState(false);
  const [bannerTitle, setBannerTitle] = React.useState('周盈利龙虎榜');
  const [currentAdIndex, setCurrentAdIndex] = React.useState(0);
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

  // 自动轮播广告
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
    }, 5000);

    return () => clearInterval(timer);
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

    setFilterParams(prev => ({
      ...prev,
      ...QUICK_FILTER_CONFIGS[type],
      page: 1,
      page_size: QUICK_FILTER_CONFIGS[type].page_size,
      limit: QUICK_FILTER_CONFIGS[type].limit
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

  const handlePrevAd = () => {
    setCurrentAdIndex((prev) => 
      prev === 0 ? advertisements.length - 1 : prev - 1
    );
  };

  const handleNextAd = () => {
    setCurrentAdIndex((prev) => 
      (prev + 1) % advertisements.length
    );
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
                {/* 广告轮播区域 - 调整高度以匹配排名表 */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg h-[calc(100%)]">
                  <div className="overflow-hidden h-full">
                    <div 
                      className="transition-transform duration-500 ease-in-out flex h-full"
                      style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
                    >
                      {advertisements.map((ad) => (
                        <div 
                          key={ad.id}
                          className="min-w-full h-full flex flex-col"
                        >
                          <a 
                            href={ad.link}
                            className="block p-4 h-full flex flex-col"
                          >
                            <div className="mb-4">
                              <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                              <p className="text-white/80">{ad.description}</p>
                            </div>
                            <div className="flex-grow relative overflow-hidden rounded-lg">
                              <img 
                                src={ad.pic} 
                                alt={ad.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 导航按钮 */}
                  <button 
                    onClick={handlePrevAd}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNextAd}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* 指示器 */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {advertisements.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentAdIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentAdIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 排名表 */}
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