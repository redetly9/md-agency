'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/v2/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="v2-container py-10 sm:py-16 max-w-md">
      <AuthForm onDone={() => setTimeout(() => router.push('/profiles'), 800)} />
    </div>
  );
}
