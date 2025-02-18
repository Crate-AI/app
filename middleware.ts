import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/database/middleware';

export async function middleware(request: NextRequest) {
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
