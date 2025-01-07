import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobile: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobile, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/img/favicon.ico" alt="Eagle Eyes Logo" className="w-8 h-8"/>
            <span className="text-xl font-bold text-orange-500">Eagle Eyes</span>
            <span className="ml-2 text-sm text-gray-500">(Beta)</span>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-orange-500 px-3 py-2">跟单交易</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 px-3 py-2">行情</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 px-3 py-2">交易</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 px-3 py-2">理财</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 px-3 py-2">更多</a>
            </nav>
          )}

          {isMobile ? (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-500 hover:text-orange-500">登录</button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                注册
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
            <div className="pt-4 flex space-x-4">
              <button className="flex-1 text-gray-500 hover:text-orange-500 px-4 py-2 border border-gray-300 rounded-md">
                登录
              </button>
              <button className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                注册
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};