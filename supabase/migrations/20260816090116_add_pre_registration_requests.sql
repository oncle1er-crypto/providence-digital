create table public.pre_registration_requests (
  id uuid primary key default gen_random_uuid(),
  guardian_name text not null check (char_length(guardian_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  phone text not null check (char_length(phone) between 8 and 30),
  child_name text not null check (char_length(child_name) between 2 and 120),
  child_age smallint not null check (child_age between 2 and 20),
  desired_level text not null check (desired_level in ('Maternelle', 'Primaire', 'Collège', 'Lycée')),
  message text check (message is null or char_length(message) <= 1500),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

comment on table public.pre_registration_requests is
  'Demandes de préinscription reçues depuis la page Admissions.';

create index pre_registration_requests_created_at_idx
  on public.pre_registration_requests (created_at desc);

create index pre_registration_requests_contact_recent_idx
  on public.pre_registration_requests (lower(email), phone, created_at desc);

create or replace function private.prevent_pre_registration_spam()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.guardian_name := btrim(new.guardian_name);
  new.email := lower(btrim(new.email));
  new.phone := btrim(new.phone);
  new.child_name := btrim(new.child_name);
  new.message := nullif(btrim(coalesce(new.message, '')), '');

  if exists (
    select 1
    from public.pre_registration_requests request
    where request.created_at > now() - interval '10 minutes'
      and (
        lower(request.email) = new.email
        or regexp_replace(request.phone, '[^0-9+]', '', 'g') =
          regexp_replace(new.phone, '[^0-9+]', '', 'g')
      )
  ) then
    raise exception using
      errcode = 'P0001',
      message = 'Une demande récente existe déjà pour ces coordonnées.';
  end if;

  return new;
end;
$$;

revoke all on function private.prevent_pre_registration_spam() from public;

create trigger pre_registration_requests_prevent_spam
before insert on public.pre_registration_requests
for each row execute function private.prevent_pre_registration_spam();

alter table public.pre_registration_requests enable row level security;

revoke all on public.pre_registration_requests from anon, authenticated;
grant insert on public.pre_registration_requests to anon, authenticated;
grant select, update on public.pre_registration_requests to authenticated;

create policy pre_registration_public_insert
on public.pre_registration_requests
for insert
to anon, authenticated
with check (
  status = 'new'
  and char_length(guardian_name) between 2 and 120
  and char_length(email) between 5 and 254
  and char_length(phone) between 8 and 30
  and char_length(child_name) between 2 and 120
  and child_age between 2 and 20
  and desired_level in ('Maternelle', 'Primaire', 'Collège', 'Lycée')
  and (message is null or char_length(message) <= 1500)
);

create policy pre_registration_admin_read
on public.pre_registration_requests
for select
to authenticated
using ((select private.is_cms_admin()));

create policy pre_registration_admin_update
on public.pre_registration_requests
for update
to authenticated
using ((select private.is_cms_admin()))
with check ((select private.is_cms_admin()));
