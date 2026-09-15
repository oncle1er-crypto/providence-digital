create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  phone text check (phone is null or char_length(phone) between 8 and 30),
  subject text not null check (subject in ('Admission', 'Scolarité', 'Visite', 'Administration', 'Autre')),
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new' check (status in ('new', 'read', 'closed')),
  created_at timestamptz not null default now()
);

comment on table public.contact_messages is
  'Messages reçus depuis le formulaire de la page Contact.';

create index contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create or replace function private.prevent_contact_message_spam()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.name := btrim(new.name);
  new.email := lower(btrim(new.email));
  new.phone := nullif(btrim(coalesce(new.phone, '')), '');
  new.message := btrim(new.message);

  if exists (
    select 1
    from public.contact_messages existing
    where existing.created_at > now() - interval '2 minutes'
      and (
        lower(existing.email) = new.email
        or regexp_replace(coalesce(existing.phone, ''), '[^0-9+]', '', 'g') =
          regexp_replace(coalesce(new.phone, ''), '[^0-9+]', '', 'g')
      )
  ) then
    raise exception using
      errcode = 'P0001',
      message = 'Un message a déjà été envoyé avec ces coordonnées il y a quelques instants.';
  end if;

  return new;
end;
$$;

revoke all on function private.prevent_contact_message_spam() from public;

create trigger contact_messages_prevent_spam
before insert on public.contact_messages
for each row execute function private.prevent_contact_message_spam();

alter table public.contact_messages enable row level security;

revoke all on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update on public.contact_messages to authenticated;

create policy contact_messages_public_insert
on public.contact_messages
for insert
to anon, authenticated
with check (
  status = 'new'
  and char_length(name) between 2 and 120
  and char_length(email) between 5 and 254
  and (phone is null or char_length(phone) between 8 and 30)
  and subject in ('Admission', 'Scolarité', 'Visite', 'Administration', 'Autre')
  and char_length(message) between 10 and 3000
);

create policy contact_messages_admin_read
on public.contact_messages
for select
to authenticated
using ((select private.is_cms_admin()));

create policy contact_messages_admin_update
on public.contact_messages
for update
to authenticated
using ((select private.is_cms_admin()))
with check ((select private.is_cms_admin()));
