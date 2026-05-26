-- Stores closed-beta access requests captured from the marketing site.
-- One row per unique email; source identifies the form on the page that
-- captured it (e.g. "home-hero", "footer", "dialog", "home-cta").
create table public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create unique index early_access_signups_email_lower_idx
  on public.early_access_signups (lower(email));

create index early_access_signups_created_at_idx
  on public.early_access_signups (created_at desc);

-- RLS on; only the service role inserts. No public select.
alter table public.early_access_signups enable row level security;
