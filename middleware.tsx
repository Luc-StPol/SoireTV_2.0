import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userId = request.cookies.get('userId');
  console.log('token:', token, ' userId:', userId);
  if (!token || !userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/'],
};
