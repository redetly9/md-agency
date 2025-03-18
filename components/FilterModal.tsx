'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealType: string;
  propertyType: string;
}

const FilterModal = ({ isOpen, onClose, dealType, propertyType }: FilterModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Состояния для фильтров
  const [region, setRegion] = useState<string>('astana');
  const [complex, setComplex] = useState<string>('');
  const [rooms, setRooms] = useState<number[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>('');
  const [priceTo, setPriceTo] = useState<string>('');
  const [areaFrom, setAreaFrom] = useState<string>('');
  const [areaTo, setAreaTo] = useState<string>('');
  const [floorFrom, setFloorFrom] = useState<string>('');
  const [floorTo, setFloorTo] = useState<string>('');
  const [notFirstFloor, setNotFirstFloor] = useState<boolean>(false);
  const [notLastFloor, setNotLastFloor] = useState<boolean>(false);
  const [fromDeveloper, setFromDeveloper] = useState<boolean>(false);
  const [fromAgents, setFromAgents] = useState<boolean>(false);
  
  // Состояние для отображения выпадающего списка регионов
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  
  // Список регионов Казахстана
  const regions = [
    { id: 'astana', name: 'Астана' },
    { id: 'almaty', name: 'Алматы' },
    { id: 'shymkent', name: 'Шымкент' },
    { id: 'abay-obl', name: 'Абайская обл.' },
    { id: 'akmola-obl', name: 'Акмолинская обл.' },
    { id: 'aktobe-obl', name: 'Актюбинская обл.' },
    { id: 'almaty-obl', name: 'Алматинская обл.' },
    { id: 'atyrau-obl', name: 'Атырауская обл.' },
    { id: 'vko-obl', name: 'Восточно-Казахстанская обл.' },
    { id: 'zhambyl-obl', name: 'Жамбылская обл.' },
    { id: 'zhetisu-obl', name: 'Жетысуская обл.' },
    { id: 'zko-obl', name: 'Западно-Казахстанская обл.' },
    { id: 'karaganda-obl', name: 'Карагандинская обл.' },
    { id: 'kostanay-obl', name: 'Костанайская обл.' },
    { id: 'kyzylorda-obl', name: 'Кызылординская обл.' },
    { id: 'mangystau-obl', name: 'Мангистауская обл.' },
    { id: 'pavlodar-obl', name: 'Павлодарская обл.' },
    { id: 'sko-obl', name: 'Северо-Казахстанская обл.' },
    { id: 'turkestan-obl', name: 'Туркестанская обл.' },
    { id: 'ulytau-obl', name: 'Улытауская обл.' }
  ];
  
  // Функция для получения названия региона по его id
  const getRegionName = (regionId: string) => {
    const foundRegion = regions.find(r => r.id === regionId);
    return foundRegion ? foundRegion.name : 'Выберите регион';
  };
  
  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setShowRegionDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Загрузка параметров из URL при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setRegion(searchParams.get('region') || 'astana');
      setComplex(searchParams.get('complex') || '');
      setRooms(searchParams.get('rooms') ? searchParams.get('rooms')!.split(',').map(Number) : []);
      setPriceFrom(searchParams.get('priceFrom') || '');
      setPriceTo(searchParams.get('priceTo') || '');
      setAreaFrom(searchParams.get('areaFrom') || '');
      setAreaTo(searchParams.get('areaTo') || '');
      setFloorFrom(searchParams.get('floorFrom') || '');
      setFloorTo(searchParams.get('floorTo') || '');
      setNotFirstFloor(searchParams.get('notFirstFloor') === '1');
      setNotLastFloor(searchParams.get('notLastFloor') === '1');
      setFromDeveloper(searchParams.get('fromDeveloper') === '1');
      setFromAgents(searchParams.get('fromAgents') === '1');
    }
  }, [isOpen, searchParams]);
  
  // Сброс всех фильтров
  const handleReset = () => {
    setRegion('astana');
    setComplex('');
    setRooms([]);
    setPriceFrom('');
    setPriceTo('');
    setAreaFrom('');
    setAreaTo('');
    setFloorFrom('');
    setFloorTo('');
    setNotFirstFloor(false);
    setNotLastFloor(false);
    setFromDeveloper(false);
    setFromAgents(false);
  };
  
  // Применение фильтров
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (region) params.set('region', region);
    if (complex) params.set('complex', complex);
    if (rooms.length > 0) params.set('rooms', rooms.join(','));
    if (priceFrom) params.set('priceFrom', priceFrom);
    if (priceTo) params.set('priceTo', priceTo);
    if (areaFrom) params.set('areaFrom', areaFrom);
    if (areaTo) params.set('areaTo', areaTo);
    if (floorFrom) params.set('floorFrom', floorFrom);
    if (floorTo) params.set('floorTo', floorTo);
    if (notFirstFloor) params.set('notFirstFloor', '1');
    if (notLastFloor) params.set('notLastFloor', '1');
    if (fromDeveloper) params.set('fromDeveloper', '1');
    if (fromAgents) params.set('fromAgents', '1');
    
    // Добавляем текущую страницу
    params.set('page', '1'); // Сбрасываем на первую страницу при применении фильтров
    
    router.push(`/listings/search/${dealType}/${propertyType}?${params.toString()}`);
    onClose();
  };
  
  // Обработчик выбора комнат
  const toggleRoom = (room: number) => {
    if (rooms.includes(room)) {
      setRooms(rooms.filter(r => r !== room));
    } else {
      setRooms([...rooms, room]);
    }
  };
  
  // Обработчик выбора региона
  const selectRegion = (regionId: string) => {
    setRegion(regionId);
    setShowRegionDropdown(false);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-center overflow-hidden">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg flex flex-col h-[100vh]">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-2 text-gray-500">
              <X size={24} />
            </button>
            <h2 className="text-xl font-medium">Фильтр</h2>
          </div>
          <button 
            onClick={handleReset} 
            className="text-blue-500 font-medium"
          >
            Сбросить
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx global>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* Регион */}
          <div className="mb-4" ref={regionRef}>
            <label className="block text-gray-700 mb-2">Регион</label>
            <div className="relative">
              <div 
                className="w-full p-3 border rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
              >
                <span>{getRegionName(region)}</span>
                {region && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setRegion('');
                    }}
                    className="text-gray-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {showRegionDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {regions.map((r) => (
                    <div 
                      key={r.id}
                      className={`p-3 cursor-pointer hover:bg-gray-100 ${region === r.id ? 'bg-blue-50 text-blue-500' : ''}`}
                      onClick={() => selectRegion(r.id)}
                    >
                      {r.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Жилой комплекс */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Жилой комплекс</label>
            <div className="flex justify-between items-center border rounded-lg p-3">
              <div className="text-gray-500">Выбрать</div>
              <div className="text-gray-400">›</div>
            </div>
          </div>
          
          {/* Количество комнат */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Количество комнат</label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, '5+'].map((room, index) => (
                <button
                  key={index}
                  onClick={() => toggleRoom(typeof room === 'string' ? 5 : room as number)}
                  className={`py-3 border rounded-lg ${
                    rooms.includes(typeof room === 'string' ? 5 : room as number)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
          
          {/* Цена */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Цена, тг</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="от"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="до"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="p-3 border rounded-lg"
              />
            </div>
          </div>
          
          {/* Общая площадь */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Общая площадь, м²</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="от"
                value={areaFrom}
                onChange={(e) => setAreaFrom(e.target.value)}
                className="p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="до"
                value={areaTo}
                onChange={(e) => setAreaTo(e.target.value)}
                className="p-3 border rounded-lg"
              />
            </div>
          </div>
          
          {/* Этаж */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Этаж</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="number"
                placeholder="от"
                value={floorFrom}
                onChange={(e) => setFloorFrom(e.target.value)}
                className="p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="до"
                value={floorTo}
                onChange={(e) => setFloorTo(e.target.value)}
                className="p-3 border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 border rounded-lg flex items-center">
                <input
                  type="checkbox"
                  id="notFirstFloor"
                  checked={notFirstFloor}
                  onChange={(e) => setNotFirstFloor(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="notFirstFloor">Не первый</label>
              </div>
              <div className="p-3 border rounded-lg flex items-center">
                <input
                  type="checkbox"
                  id="notLastFloor"
                  checked={notLastFloor}
                  onChange={(e) => setNotLastFloor(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="notLastFloor">Не последний</label>
              </div>
            </div>
          </div>
          
          {/* От застройщика */}
          <div className="mb-4 flex items-center">
            <label className="flex-grow text-gray-700">От застройщика</label>
            <input
              type="checkbox"
              checked={fromDeveloper}
              onChange={(e) => setFromDeveloper(e.target.checked)}
              className="w-5 h-5"
            />
          </div>
          
          {/* От Крыша Агентов */}
          <div className="mb-4 flex items-center">
            <label className="flex-grow text-gray-700">От Крыша Агентов</label>
            <input
              type="checkbox"
              checked={fromAgents}
              onChange={(e) => setFromAgents(e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
        
        <div className="p-4 border-t sticky bottom-0 bg-white">
          <button
            onClick={applyFilters}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium"
          >
            Показать результаты
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal; 