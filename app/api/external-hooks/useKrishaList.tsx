import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('http://localhost:3010/api/parse');
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
