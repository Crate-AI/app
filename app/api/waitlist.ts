import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase/client';

export const Route = createFileRoute('/api/waitlist')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await request.json();

          const { email, user_type } = data;

          if (!email || !user_type) {
            return Response.json(
              { error: 'Email and user type are required' },
              { status: 400 },
            );
          }

          const { error } = await supabase
            .from('waitlist')
            .insert([{ email, user_type }]);

          if (error) {
            throw error;
          }

          return Response.json(
            { message: 'Successfully added to waitlist!' },
            { status: 200 },
          );
        } catch (error) {
          console.error('Error adding to waitlist:', error);
          return Response.json(
            { error: 'Failed to add to waitlist' },
            { status: 500 },
          );
        }
      },
    },
  },
});
