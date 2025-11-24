import { createFileRoute } from '@tanstack/react-router';
import { serialize } from 'cookie';

export const Route = createFileRoute('/api/auth/set-redirect')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { redirectUrl } = await request.json();
          const headers = new Headers();
          headers.append(
            'Set-Cookie',
            serialize('auth_redirect', redirectUrl, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 300, // 5 minutes
            }),
          );
          return new Response('OK', { headers });
        } catch (error) {
          return new Response('Error', { status: 500 });
        }
      },
    },
  },
});
