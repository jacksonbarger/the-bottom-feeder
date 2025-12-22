import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Add request ID for tracing
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);

  // Add timing header for performance monitoring
  response.headers.set('X-Response-Time', new Date().toISOString());

  // Rate limiting headers (informational)
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', '99');

  // CORS headers for API routes only
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all request paths except static files
    '/((?!_next/static|_next/image|favicon.ico|images|models).*)',
  ],
};
