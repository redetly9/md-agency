'use client';
import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider>
          <Toaster position="bottom-right" />
          {children}
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
