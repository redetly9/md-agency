'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';
import { useState } from 'react';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  
  const chatId = params.id as string;
  
  // Моковые данные для демонстрации
  const chatData = {
    '1': { name: 'Анна Петрова', isOnline: true },
    '2': { name: 'Михаил Иванов', isOnline: false },
    '3': { name: 'Елена Сидорова', isOnline: false },
    '4': { name: 'Дмитрий Козлов', isOnline: true },
    '5': { name: 'Ольга Новикова', isOnline: false }
  };

  const currentChat = chatData[chatId as keyof typeof chatData] || { name: 'Неизвестный пользователь', isOnline: false };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
        <button 
          onClick={() => router.back()}
          className="mr-3 p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-center flex-1">
          <div className="relative mr-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {currentChat.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {currentChat.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div>
            <h1 className="font-semibold text-gray-900">{currentChat.name}</h1>
            <p className="text-sm text-gray-500">
              {currentChat.isOnline ? 'в сети' : 'был в сети недавно'}
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Demo messages */}
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
              <p className="text-gray-900">Привет! Интересует квартира на Ленина, 45</p>
              <span className="text-xs text-gray-500 mt-1">14:20</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-primary p-3 rounded-2xl rounded-tr-md max-w-xs">
              <p className="text-white">Здравствуйте! Конечно, расскажу подробнее</p>
              <span className="text-xs text-primary-100 mt-1">14:21</span>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
              <p className="text-gray-900">Когда можно посмотреть?</p>
              <span className="text-xs text-gray-500 mt-1">14:22</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip size={24} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Smile size={20} />
            </button>
          </div>
          
          <button 
            onClick={handleSend}
            className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
} 