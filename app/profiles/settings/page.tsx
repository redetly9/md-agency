'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Lock, 
  Link as LinkIcon,
  Search,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const ProfileSettingsPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Александр Петров',
    email: 'alex.petrov@gmail.com',
    avatar: null
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto flex items-center">
          <Link href="/profiles" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Настройки профиля</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow px-4 py-6 pb-20">
        <div className="max-w-screen-md mx-auto space-y-6">
          
          {/* User Profile */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={40} className="text-gray-500" />
                </div>
              </div>
              
              {/* User Info */}
              <button className="text-[#016a80] font-medium mb-3">
                Изменить фото
              </button>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {userInfo.name}
              </h2>
              <p className="text-gray-500">
                {userInfo.email}
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl overflow-hidden">
            
            {/* Personal Data */}
            <Link href="/profiles/settings/personal" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-600" />
                <span className="text-gray-900">Личные данные</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {/* Notifications */}
            <Link href="/profiles/settings/notifications" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <span className="text-gray-900">Настройки уведомлений</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {/* Privacy */}
            <Link href="/profiles/settings/privacy" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gray-600" />
                <span className="text-gray-900">Настройки приватности</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {/* Security */}
            <Link href="/profiles/settings/security" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-gray-600" />
                <span className="text-gray-900">Безопасность</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {/* Social Networks */}
            <Link href="/profiles/settings/social" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <LinkIcon size={20} className="text-gray-600" />
                <span className="text-gray-900">Привязка соцсетей</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {/* Search Settings */}
            <Link href="/profiles/settings/search" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-gray-600" />
                <span className="text-gray-900">Настройки поиска</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {/* Support */}
            <Link href="/profiles/settings/support" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-600" />
                <span className="text-gray-900">Служба поддержки</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 py-6">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>

          {/* Logout */}
          <div className="bg-white rounded-xl p-4">
            <button className="w-full text-red-500 font-medium py-3 text-center">
              Выйти из аккаунта
            </button>
          </div>

          {/* Version */}
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm">Версия 2.1.0</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettingsPage; 