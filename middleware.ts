import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/database/middleware';

export async function middleware(request: NextRequest) {
  // Log request details for debugging
  console.log('Middleware - Request:', {
    pathname: request.nextUrl.pathname,
    method: request.method,
    env: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
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
    request.nextUrl.pathname.startsWith(path)
  );

  if (shouldBypassAuth) {
    console.log('Bypassing Vercel auth for path:', request.nextUrl.pathname);
    return NextResponse.next();
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
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/auth/discogs/:path*',
    '/api/external/discogs/:path*',
    '/api/music/:path*'
  ],
};
