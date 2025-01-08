import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EagleIcon } from './icons';
import { register } from '../api';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !password || !code) {
      setError('请填写所有字段');
      return;
    }

    try {
      await register(name, password, code);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f08300] to-[#ffc180] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex flex-col items-center mb-8">
          <EagleIcon />
          <h2 className="text-2xl font-bold mt-4 text-[#f08300]">注册</h2>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              邀请码
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#f08300]"
              placeholder="请输入邀请码"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f08300] text-white py-2 rounded-lg hover:bg-[#d97600] transition-colors"
          >
            注册
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-[#f08300] hover:text-[#d97600]">
            已有账户？登录
          </a>
        </div>
      </div>
    </div>
  );
}