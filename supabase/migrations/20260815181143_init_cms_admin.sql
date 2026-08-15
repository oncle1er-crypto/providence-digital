create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  category text,
  image_path text,
  video_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  public_visible boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  alt_text text,
  kind text not null default 'image' check (kind in ('image', 'video', 'document')),
  is_public boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function private.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = (select auth.uid())
      and au.is_active = true
  );
$$;
revoke all on function private.is_cms_admin() from public;
grant execute on function private.is_cms_admin() to authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger admin_users_set_updated_at
before update on public.admin_users
for each row execute function private.set_updated_at();

create trigger news_posts_set_updated_at
before update on public.news_posts
for each row execute function private.set_updated_at();

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function private.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.news_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.news_posts from anon, authenticated;
revoke all on public.site_settings from anon, authenticated;
revoke all on public.media_assets from anon, authenticated;

grant select on public.admin_users to authenticated;
grant select on public.news_posts, public.site_settings, public.media_assets to anon, authenticated;
grant insert, update, delete on public.news_posts, public.site_settings, public.media_assets to authenticated;

create policy admin_users_read_self
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy news_public_read
on public.news_posts
for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy news_admin_read
on public.news_posts
for select
to authenticated
using ((select private.is_cms_admin()));

create policy news_admin_insert
on public.news_posts
for insert
to authenticated
with check ((select private.is_cms_admin()));

create policy news_admin_update
on public.news_posts
for update
to authenticated
using ((select private.is_cms_admin()))
with check ((select private.is_cms_admin()));

create policy news_admin_delete
on public.news_posts
for delete
to authenticated
using ((select private.is_cms_admin()));

create policy settings_public_read
on public.site_settings
for select
to anon, authenticated
using (public_visible = true);

create policy settings_admin_read
on public.site_settings
for select
to authenticated
using ((select private.is_cms_admin()));

create policy settings_admin_insert
on public.site_settings
for insert
to authenticated
with check ((select private.is_cms_admin()));

create policy settings_admin_update
on public.site_settings
for update
to authenticated
using ((select private.is_cms_admin()))
with check ((select private.is_cms_admin()));

create policy settings_admin_delete
on public.site_settings
for delete
to authenticated
using ((select private.is_cms_admin()));

create policy media_public_read
on public.media_assets
for select
to anon, authenticated
using (is_public = true);

create policy media_admin_read
on public.media_assets
for select
to authenticated
using ((select private.is_cms_admin()));

create policy media_admin_insert
on public.media_assets
for insert
to authenticated
with check ((select private.is_cms_admin()));

create policy media_admin_update
on public.media_assets
for update
to authenticated
using ((select private.is_cms_admin()))
with check ((select private.is_cms_admin()));

create policy media_admin_delete
on public.media_assets
for delete
to authenticated
using ((select private.is_cms_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  26214400,
  array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm','application/pdf']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy cms_media_admin_select
on storage.objects
for select
to authenticated
using (bucket_id = 'cms-media' and (select private.is_cms_admin()));

create policy cms_media_admin_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'cms-media' and (select private.is_cms_admin()));

create policy cms_media_admin_update
on storage.objects
for update
to authenticated
using (bucket_id = 'cms-media' and (select private.is_cms_admin()))
with check (bucket_id = 'cms-media' and (select private.is_cms_admin()));

create policy cms_media_admin_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'cms-media' and (select private.is_cms_admin()));

insert into public.site_settings (key, value, public_visible)
values (
  'identity',
  jsonb_build_object(
    'school_name', 'Complexe Scolaire Catholique La Providence de Don Orione',
    'website', 'https://www.cslaprovidence.org'
  ),
  true
)
on conflict (key) do nothing;
