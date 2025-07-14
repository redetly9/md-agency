'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  isRead: boolean;
  unreadCount?: number;
  hasImage?: boolean;
  imagePreview?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Анна Петрова',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0c4fb?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Когда можно посмотреть квартиру?',
    time: '14:22',
    isOnline: true,
    isRead: true,
    unreadCount: 2,
    hasImage: true,
    imagePreview: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=60&h=60&fit=crop'
  },
  {
    id: '2',
    name: 'Михаил Иванов',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Здравствуйте, интересует стоимость...',
    time: '12:45',
    isOnline: false,
    isRead: true,
    hasImage: true,
    imagePreview: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=60&h=60&fit=crop'
  },
  {
    id: '3',
    name: 'Елена Сидорова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Спасибо за информацию!',
    time: 'Вчера',
    isOnline: false,
    isRead: true
  },
  {
    id: '4',
    name: 'Дмитрий Козлов',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Можно узнать адрес объекта?',
    time: 'Вчера',
    isOnline: true,
    isRead: false,
    unreadCount: 1,
    hasImage: true,
    imagePreview: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=60&h=60&fit=crop'
  },
  {
    id: '5',
    name: 'Ольга Новикова',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Договорились, до встреч!',
    time: 'Пн',
    isOnline: false,
    isRead: true
  }
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = mockMessages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4">
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Сообщения</h1>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white px-4 pb-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по чатам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] rounded-[38px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 bg-white">
        <div className="max-w-screen-md mx-auto">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Чаты не найдены</h3>
              <p className="text-gray-500 text-center">
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredMessages.map((message) => (
                <Link 
                  key={message.id} 
                  href={`/messages/${message.id}`}
                  className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0 mr-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                      <img 
                        src={message.avatar} 
                        alt={message.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {message.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-medium text-gray-900 truncate">
                        {message.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#999999] font-light">{message.time}</span>
                        {message.unreadCount && (
                          <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {message.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {/* Read indicator */}
                      <div className="flex-shrink-0">
                        <svg 
                          className={`w-4 h-4 ${message.isRead ? 'text-teal-500' : 'text-gray-400'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      
                      {/* Message preview */}
                      <p className={`text-sm truncate flex-1 ${
                        message.unreadCount ? 'text-gray-900 font-light' : 'text-[#666666] font-light'
                      
                      }`}>
                        {message.lastMessage}
                      </p>
                    </div>
                    
                    {/* Image preview under message */}
                    {message.hasImage && (
                      <div className="mt-2 ml-6">
                        <img 
                          src={message.imagePreview} 
                          alt="preview"
                          className="w-12 h-12 rounded object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 