import Auth from '@/components/Auth';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Auth />
    </div>
  );
};

export default LoginPage;
