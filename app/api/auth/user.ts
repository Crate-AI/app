import { createFileRoute } from '@tanstack/react-router';
import { parse } from 'cookie';
import type { UserIdentity } from '@/types';

export const Route = createFileRoute('/api/auth/user')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const userDataCookie = cookies['user_data'];

          if (!userDataCookie) {
            return Response.json({ user: null });
          }

          const user = JSON.parse(userDataCookie) as UserIdentity;
          return Response.json({ user });
        } catch (error) {
          console.error('Error getting current user:', error);
          return Response.json({ user: null });
        }
      },
    },
  },
});
