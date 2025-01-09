import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EagleIcon } from './icons';
import { login } from '../api';
import { ChangePasswordDialog } from '../components/ChangePasswordDialog';

export function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [forgotPasswordUsername, setForgotPasswordUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !password) {
      setError('请填写所有字段');
      return;
    }

    try {
      await login(name, password);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', name);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    }
  };

  const handleForgotPassword = () => {
    if (!name) {
      setError('请先输入用户名');
      return;
    }
    setForgotPasswordUsername(name);
    setIsChangePasswordOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f08300] to-[#ffc180] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex flex-col items-center mb-8">
          <EagleIcon />
          <h2 className="text-2xl font-bold mt-4 text-[#f08300]">登录</h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              用户名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#f08300]"
              placeholder="请输入用户名"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#f08300]"
              placeholder="请输入密码"
            />
          </div>
          <div className="mb-6 text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#f08300] hover:text-[#d97600]"
            >
              忘记密码？
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#f08300] text-white py-2 rounded-lg hover:bg-[#d97600] transition-colors"
          >
            登录
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-[#f08300] hover:text-[#d97600]">
            注册新账户
          </a>
        </div>
      </div>

      <ChangePasswordDialog
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        username={forgotPasswordUsername}
      />
    </div>
  );
}