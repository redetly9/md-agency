'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
      // @ts-ignore
      toast.error(error?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#122037] p-8 rounded-lg shadow-none">
      <h2 className="text-2xl font-bold mb-6 text-textPrimary">
        {isLogin ? 'Вход' : 'Регистрация'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af5a]"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af5a]"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af5a]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#e6c87a] to-[#b8892e] text-[#0b1626] font-semibold p-3 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-[#e6c87a] hover:underline text-sm"
        disabled={loading}
      >
        {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
      </button>
    </div>
  );
}