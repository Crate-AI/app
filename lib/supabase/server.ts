import { Database } from '@/types/database/supabase';
import { createServerClient } from '@supabase/ssr';
import { getWebRequest, appendResponseHeader } from 'vinxi/http';
import { parse, serialize } from 'cookie';

export async function createClient(context?: {
  request?: Request;
  headers?: Headers;
}) {
  let cookiesStr = '';
  if (context?.request) {
    cookiesStr = context.request.headers.get('cookie') || '';
  } else {
    try {
      const request = getWebRequest();
      cookiesStr = request.headers.get('cookie') || '';
    } catch (e) {
      // Fallback or ignore if not in request context
    }
  }

  return createServerClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          const parsed = parse(cookiesStr);
          return Object.entries(parsed).map(([name, value]) => ({
            name,
            value: value ?? '',
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (context?.headers) {
              context.headers.append(
                'Set-Cookie',
                serialize(name, value, options),
              );
            } else {
              try {
                appendResponseHeader(
                  'Set-Cookie',
                  serialize(name, value, options),
                );
              } catch {
                // The `setAll` method was called from a Server Component.
              }
            }
          });
        },
      },
    },
  );
}
