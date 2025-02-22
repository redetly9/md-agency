import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Защита роутов
  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Редирект авторизованных пользователей со страниц логина
  if (session && isAuthRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return res;
}

// Защищенные маршруты
function isProtectedRoute(pathname: string) {
  const protectedRoutes = ['/profile', '/favorites'];
  return protectedRoutes.some(route => pathname.startsWith(route));
}

// Маршруты авторизации
function isAuthRoute(pathname: string) {
  const authRoutes = ['/login', '/register'];
  return authRoutes.includes(pathname);
}

export const config = {
  matcher: ['/profile/:path*', '/favorites/:path*', '/login', '/register'],
};
