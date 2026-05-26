import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_SOURCE_LENGTH = 64;

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

export async function POST(req: Request) {
  let payload: { email?: unknown; source?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const rawEmail = typeof payload.email === 'string' ? payload.email.trim() : '';
  const rawSource =
    typeof payload.source === 'string' ? payload.source.trim() : '';

  if (
    !rawEmail ||
    rawEmail.length > MAX_EMAIL_LENGTH ||
    !EMAIL_RE.test(rawEmail)
  ) {
    return json(400, { error: 'invalid_email' });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('early-access: Supabase env vars missing');
    return json(500, { error: 'server_misconfigured' });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false }
  });

  const { error } = await supabase
    .from('early_access_signups')
    .insert({
      email: rawEmail.toLowerCase(),
      source: rawSource.slice(0, MAX_SOURCE_LENGTH) || null
    });

  if (error) {
    // 23505 = unique violation on the lowered-email index
    if (error.code === '23505') {
      return json(409, { error: 'duplicate' });
    }
    console.error('early-access: insert failed', error);
    return json(500, { error: 'insert_failed' });
  }

  return json(200, { ok: true });
}
