'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onOpenModal: () => void;
  dealType: string;
  propertyType: string;
}

const FilterBar = ({ onOpenModal, dealType, propertyType }: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Получаем текущие значения фильтров
  const region = searchParams.get('region') || 'astana';
  const city = searchParams.get('city') || '';
  const rooms = searchParams.get('rooms')?.split(',') || [];
  const priceFrom = searchParams.get('priceFrom');
  const priceTo = searchParams.get('priceTo');

  // Функция для форматирования цены
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU').format(parseInt(price));
  };

  // Получаем название региона
  const getRegionName = (regionId: string) => {
    const regions = [
      { id: 'astana', name: 'Астана' },
      { id: 'almaty', name: 'Алматы' },
      { id: 'shymkent', name: 'Шымкент' },
      // ... другие регионы
    ];
    const foundRegion = regions.find(r => r.id === regionId);
    return foundRegion ? foundRegion.name : 'Выберите регион';
  };

  // Получаем название города
  const getCityName = (cityId: string) => {
    const cities = [
      { id: 'astana', name: 'Астана' },
      { id: 'almaty', name: 'Алматы' },
      { id: 'shymkent', name: 'Шымкент' },
      { id: 'aktobe', name: 'Актобе' },
      { id: 'taraz', name: 'Тараз' },
      { id: 'pavlodar', name: 'Павлодар' },
      { id: 'semey', name: 'Семей' },
      { id: 'ust-kamenogorsk', name: 'Усть-Каменогорск' },
      { id: 'oral', name: 'Уральск' },
      { id: 'atyrau', name: 'Атырау' },
      { id: 'aktau', name: 'Актау' },
      { id: 'kostanay', name: 'Костанай' },
      { id: 'kyzylorda', name: 'Кызылорда' },
      { id: 'petropavlovsk', name: 'Петропавловск' },
      { id: 'turkestan', name: 'Туркестан' },
      { id: 'karaganda', name: 'Караганда' },
      { id: 'temirtau', name: 'Темиртау' },
      { id: 'zhanaozen', name: 'Жанаозен' },
      { id: 'ekibastuz', name: 'Экибастуз' },
      { id: 'rudny', name: 'Рудный' },
      { id: 'kokshetau', name: 'Кокшетау' },
      { id: 'taldykorgan', name: 'Талдыкорган' },
      { id: 'shymkent-obl', name: 'Шымкент (обл.)' },
      { id: 'other', name: 'Другие города' }
    ];
    const foundCity = cities.find(c => c.id === cityId);
    return foundCity ? foundCity.name : '';
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-screen-md mx-auto py-2 px-4">
        <div className="flex items-center gap-4 text-sm">
          {/* Регион */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Регион:</span>
            <span className="font-medium">{getRegionName(region)}</span>
          </div>

          {/* Город */}
          {city && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Город:</span>
              <span className="font-medium">{getCityName(city)}</span>
            </div>
          )}

          {/* Комнаты */}
          {rooms.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Комнат:</span>
              <span className="font-medium">
                {rooms.map(room => room === '5' ? '5+' : room).join(', ')}
              </span>
            </div>
          )}

          {/* Цена */}
          {(priceFrom || priceTo) && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Цена:</span>
              <span className="font-medium">
                {priceFrom && formatPrice(priceFrom)}
                {priceFrom && priceTo && ' - '}
                {priceTo && formatPrice(priceTo)} ₸
              </span>
            </div>
          )}

          {/* Кнопка открытия модального окна с полными фильтрами */}
          <button
            onClick={onOpenModal}
            className="ml-auto flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <Filter size={16} />
            <span>Все фильтры</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 