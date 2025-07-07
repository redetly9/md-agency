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
    avatar: '/images/avatar1.jpg',
    lastMessage: 'Когда можно посмотреть квартиру?',
    time: '14:22',
    isOnline: true,
    isRead: true,
    unreadCount: 2,
    hasImage: true,
    imagePreview: '/images/apartment1.jpg'
  },
  {
    id: '2',
    name: 'Михаил Иванов',
    avatar: '/images/avatar2.jpg',
    lastMessage: 'Здравствуйте, интересует стоимость...',
    time: '12:45',
    isOnline: false,
    isRead: true,
    hasImage: true,
    imagePreview: '/images/apartment2.jpg'
  },
  {
    id: '3',
    name: 'Елена Сидорова',
    avatar: '/images/avatar3.jpg',
    lastMessage: 'Спасибо за информацию!',
    time: 'Вчера',
    isOnline: false,
    isRead: true
  },
  {
    id: '4',
    name: 'Дмитрий Козлов',
    avatar: '/images/avatar4.jpg',
    lastMessage: 'Можно узнать адрес объекта?',
    time: 'Вчера',
    isOnline: true,
    isRead: false,
    unreadCount: 1,
    hasImage: true,
    imagePreview: '/images/apartment3.jpg'
  },
  {
    id: '5',
    name: 'Ольга Новикова',
    avatar: '/images/avatar5.jpg',
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
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Сообщения</h1>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white px-4 pb-4">
        <div className="max-w-screen-md mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по чатам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
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
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {message.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
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
                        <span className="text-sm text-gray-500">{message.time}</span>
                        {message.unreadCount && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
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
                          className={`w-4 h-4 ${message.isRead ? 'text-blue-500' : 'text-gray-400'}`} 
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
                        message.unreadCount ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {message.lastMessage}
                      </p>
                      
                      {/* Image preview */}
                      {message.hasImage && (
                        <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                        </div>
                      )}
                    </div>
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