import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/database/middleware';

export async function middleware(request: NextRequest) {
  // Get the original URL and pathname
  const url = request.url;
  const pathname = request.nextUrl.pathname;
  
  // Log detailed request information
  console.log('Middleware - Detailed Request:', {
    url,
    pathname,
    method: request.method,
    env: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    headers: {
      host: request.headers.get('host'),
      referer: request.headers.get('referer'),
    }
  });

  // Define paths that should bypass Vercel's authentication
  const bypassAuthPaths = [
    '/api/auth/discogs/request-token',
    '/api/auth/discogs/callback',
    '/api/external/discogs',
    '/api/music'
  ];

  // Check if the current path should bypass auth
  const shouldBypassAuth = bypassAuthPaths.some(path => 
    pathname.startsWith(path)
  );

  if (shouldBypassAuth) {
    console.log('Bypassing Vercel auth for path:', pathname);
    // Set headers to bypass Vercel's authentication
    const response = NextResponse.next();
    response.headers.set('x-middleware-bypass', '1');
    return response;
  }

  // For API routes that should bypass auth but weren't caught above
  if (pathname.startsWith('/api/')) {
    console.log('API route detected:', pathname);
    const response = NextResponse.next();
    response.headers.set('x-middleware-bypass', '1');
    return response;
  }

  // Continue with database session handling for other routes
  return await updateSession(request);
}

// Update matcher to include all relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*'  // Explicitly match all API routes
  ],
};
