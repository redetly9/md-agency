import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Используем переменную окружения
const BASE_URL = process.env.NEXT_PUBLIC_PARSING_SERVER_URL;

const fetchData = async () => {
  const response = await axios.get(`${BASE_URL}/api/parse`);
  return response.data;
};

export const useKrishaList = () => {
  return useQuery({
    queryKey: ['useKrishaList'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
