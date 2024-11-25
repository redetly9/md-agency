'use client';
import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { EdgeStoreProvider } from '@/lib/edgestore';
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
          <EdgeStoreProvider>
            <Toaster position="bottom-right" />
            {children}
          </EdgeStoreProvider>
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
