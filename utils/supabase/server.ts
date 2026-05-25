import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types_db';

/**
 * Server-side Supabase client. Safe to call from:
 *   - Server Components (read-only — set/remove become no-ops; middleware
 *     refreshes the session for the next request)
 *   - Route Handlers
 *   - Server Actions
 *
 * Next 15: cookies() is async, so this factory is async too.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component — middleware refreshes the
            // session on the next request, so this is safe to ignore.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // See set() comment.
          }
        }
      }
    }
  );
}
