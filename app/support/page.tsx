'use client';

import { useState } from 'react';
import { Plus, Search, MessageCircle, Clock, AlertCircle, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const priorityColors = {
  low: 'text-green-600 bg-green-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-orange-600 bg-orange-100',
  urgent: 'text-red-600 bg-red-100'
};

const statusColors = {
  open: 'text-blue-600 bg-blue-100',
  in_progress: 'text-yellow-600 bg-yellow-100',
  closed: 'text-gray-600 bg-gray-100'
};

const statusIcons = {
  open: Clock,
  in_progress: AlertCircle,
  closed: CheckCircle
};

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Моковые данные для демонстрации
  const mockTickets = [
    {
      id: 1,
      subject: 'Проблема с авторизацией',
      status: 'open',
      priority: 'high',
      category: 'technical',
      updated_at: new Date().toISOString(),
      support_messages: [
        {
          id: 1,
          content: 'Не могу войти в аккаунт',
          is_from_user: true,
          created_at: new Date().toISOString()
        }
      ]
    },
    {
      id: 2,
      subject: 'Вопрос по оплате',
      status: 'in_progress',
      priority: 'medium',
      category: 'billing',
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      support_messages: [
        {
          id: 2,
          content: 'Как изменить способ оплаты?',
          is_from_user: true,
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    }
  ];

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLastMessage = (ticket: any) => {
    if (!ticket.support_messages || ticket.support_messages.length === 0) return 'Нет сообщений';
    const lastMessage = ticket.support_messages[ticket.support_messages.length - 1];
    return lastMessage.content.length > 50 
      ? lastMessage.content.substring(0, 50) + '...' 
      : lastMessage.content;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Сегодня';
    if (diffDays === 2) return 'Вчера';
    if (diffDays <= 7) return `${diffDays - 1} дней назад`;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Поддержка</h1>
            <Link
              href="/support/new"
              className="flex items-center px-4 py-2 bg-[#016a80] text-white rounded-lg hover:bg-[#015a6b] transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Новый тикет
            </Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white px-4 pb-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по тикетам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] rounded-[38px] text-[#999999] text-sm font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white px-4 py-6 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-[#016a80]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">support@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-[#016a80]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Телефон</p>
                <p className="text-sm text-gray-600">+7 (999) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-[#016a80]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Адрес</p>
                <p className="text-sm text-gray-600">Москва, ул. Примерная, 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="flex-1 bg-white">
        <div className="max-w-screen-md mx-auto">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'Тикеты не найдены' : 'Добро пожаловать в поддержку'}
              </h3>
              <p className="text-gray-500 text-center mb-6">
                {searchQuery 
                  ? 'Попробуйте изменить поисковый запрос'
                  : 'Здесь вы можете получить помощь по любым вопросам'
                }
              </p>
              {!searchQuery && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Для создания тикета необходимо войти в систему
                  </p>
                  <Link
                    href="/login"
                    className="inline-block bg-[#016a80] text-white px-6 py-2 rounded-lg hover:bg-[#015a6b] transition-colors"
                  >
                    Войти в систему
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTickets.map((ticket) => {
                const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons];
                return (
                  <div 
                    key={ticket.id} 
                    className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Status Icon */}
                    <div className="relative flex-shrink-0 mr-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <StatusIcon size={20} className="text-gray-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-medium text-gray-900 truncate">
                          {ticket.subject}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#999999] font-light">
                            {formatDate(ticket.updated_at)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[ticket.status as keyof typeof statusColors]}`}>
                          {ticket.status === 'open' && 'Открыт'}
                          {ticket.status === 'in_progress' && 'В работе'}
                          {ticket.status === 'closed' && 'Закрыт'}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                          {ticket.priority === 'low' && 'Низкий'}
                          {ticket.priority === 'medium' && 'Средний'}
                          {ticket.priority === 'high' && 'Высокий'}
                          {ticket.priority === 'urgent' && 'Срочный'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {ticket.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-[#666666] font-light truncate">
                        {getLastMessage(ticket)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
