// @ts-nocheck
'use client';
import React, { useState, useCallback, useRef } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import debounce from 'lodash.debounce';
import { useSession } from 'next-auth/react';

import { cn } from '@/utils/helper';
import { updateFavorite } from '@/services/favorite';
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface HeartButtonProps {
  listingId: string;
  hasFavorited?: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
}) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      return router.push('/login');
    }

    await toggleFavorite(listingId);
  };

  return (
    <button
      onClick={handleClick}
      className="relative hover:opacity-80 transition"
    >
      <svg
        className={`w-6 h-6 ${isFavorite(listingId) ? 'fill-primary' : 'fill-white'} stroke-primary`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

export default HeartButton;
