import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const excludedPaths = ['/login', '/signup'];

  // Allow access to excluded paths without session check
  if (excludedPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check session token
  const token = await getToken({ req: request, secret: process.env.SECRET });

  // If token exists, allow access
  if (token) {
    return NextResponse.next();
  }

  // Otherwise, redirect to login page
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico).*)'],
};
