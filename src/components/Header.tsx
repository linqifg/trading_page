import React from 'react';
import { Menu, X, Settings } from 'lucide-react';

interface HeaderProps {
  isMobile: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onChangePassword: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isMobile, 
  isMenuOpen, 
  setIsMenuOpen,
  onChangePassword
}) => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/img/favicon.ico" alt="Eagle Eyes Logo" className="w-8 h-8"/>
            <span className="text-xl font-bold text-[#f08300]">Eagle Eyes</span>
            <span className="ml-2 text-sm text-gray-500">(Beta)</span>
          </div>

          {!isMobile && (
            <div className="flex items-center space-x-8">
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-900 hover:text-[#f08300] px-3 py-2">跟单交易</a>
                <a href="#" className="text-gray-500 hover:text-[#f08300] px-3 py-2">行情</a>
                <a href="#" className="text-gray-500 hover:text-[#f08300] px-3 py-2">交易</a>
                <a href="#" className="text-gray-500 hover:text-[#f08300] px-3 py-2">理财</a>
                <a href="#" className="text-gray-500 hover:text-[#f08300] px-3 py-2">更多</a>
              </nav>
              <button
                onClick={onChangePassword}
                className="text-gray-500 hover:text-[#f08300] p-2"
                title="修改密码"
              >
                <Settings size={20} />
              </button>
            </div>
          )}

          {isMobile && (
            <div className="flex items-center">
              <button
                onClick={onChangePassword}
                className="text-gray-500 hover:text-[#f08300] p-2 mr-2"
                title="修改密码"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-[#f08300]"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900">跟单交易</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">行情</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">交易</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">理财</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">更多</a>
          </div>
        </div>
      )}
    </header>
  );
};