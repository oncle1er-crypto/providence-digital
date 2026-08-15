create index if not exists idx_news_posts_created_by on public.news_posts(created_by);
create index if not exists idx_news_posts_updated_by on public.news_posts(updated_by);
create index if not exists idx_site_settings_updated_by on public.site_settings(updated_by);
create index if not exists idx_media_assets_created_by on public.media_assets(created_by);
create index if not exists idx_news_posts_publication on public.news_posts(status, published_at desc, sort_order, created_at desc);

drop policy if exists news_public_read on public.news_posts;
drop policy if exists news_admin_read on public.news_posts;
create policy news_anon_read_published
on public.news_posts
for select
to anon
using (status = 'published' and published_at is not null and published_at <= now());
create policy news_authenticated_read
on public.news_posts
for select
to authenticated
using (
  (status = 'published' and published_at is not null and published_at <= now())
  or (select private.is_cms_admin())
);

drop policy if exists settings_public_read on public.site_settings;
drop policy if exists settings_admin_read on public.site_settings;
create policy settings_anon_read_public
on public.site_settings
for select
to anon
using (public_visible = true);
create policy settings_authenticated_read
on public.site_settings
for select
to authenticated
using (public_visible = true or (select private.is_cms_admin()));

drop policy if exists media_public_read on public.media_assets;
drop policy if exists media_admin_read on public.media_assets;
create policy media_anon_read_public
on public.media_assets
for select
to anon
using (is_public = true);
create policy media_authenticated_read
on public.media_assets
for select
to authenticated
using (is_public = true or (select private.is_cms_admin()));
