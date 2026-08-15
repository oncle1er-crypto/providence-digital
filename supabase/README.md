# Supabase CMS — La Providence

Projet distant actuel : `providence-digital` (`laujoixondbpzdsmdfko`).

## Principe

Le site public utilise uniquement l'URL Supabase et la clé **publishable** côté navigateur. Les autorisations sont appliquées par PostgreSQL Row Level Security (RLS). Aucune `service_role` ni clé secrète ne doit être exposée au frontend.

## Migrations

Le dossier `supabase/migrations/` reprend les versions enregistrées sur le projet distant. Les anciennes versions de bootstrap administrateur sont conservées sous forme de placeholders historiques : elles ne recréent volontairement aucun jeton ou mécanisme d'activation.

## Premier administrateur d'un nouvel environnement

Le bootstrap automatique n'existe plus. Pour un nouvel environnement :

1. Créer le compte voulu dans Supabase Auth.
2. Récupérer son UUID dans Auth > Users.
3. Depuis le SQL Editor, en tant que propriétaire du projet, exécuter :

```sql
insert into public.admin_users (user_id, role, is_active)
values ('UUID_DU_COMPTE', 'admin', true)
on conflict (user_id) do update
set role = 'admin', is_active = true, updated_at = now();
```

Ne jamais intégrer l'UUID d'un administrateur, un mot de passe ou une clé secrète dans les migrations versionnées.

## Variables frontend

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Le client contient actuellement un fallback vers le projet dédié afin que les Previews fonctionnent, mais Vercel doit idéalement définir explicitement ces variables par environnement.
