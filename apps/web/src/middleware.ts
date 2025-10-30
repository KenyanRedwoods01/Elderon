import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('elderonai_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // If not authenticated and trying to access protected route
  if (!token && !isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access auth pages
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
