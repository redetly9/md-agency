'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  // Загрузка избранных при монтировании
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', user?.id);

      if (error) throw error;

      setFavorites(data.map(item => item.listing_id));
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast.error('Не удалось загрузить избранное');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (listingId: string) => {
    if (!user) {
      toast.error('Необходимо войти в систему');
      return;
    }

    try {
      const isFavorite = favorites.includes(listingId);

      if (isFavorite) {
        // Удаляем из избранного
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', listingId);

        if (error) throw error;

        setFavorites(favorites.filter(id => id !== listingId));
        toast.success('Удалено из избранного');
      } else {
        // Добавляем в избранное
        const { error } = await supabase
          .from('favorites')
          .insert([
            {
              user_id: user.id,
              listing_id: listingId,
            },
          ]);

        if (error) throw error;

        setFavorites([...favorites, listingId]);
        toast.success('Добавлено в избранное');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Произошла ошибка');
    }
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
  };
}; 