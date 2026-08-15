update public.site_settings
set value = jsonb_set(
  value,
  '{address}',
  to_jsonb('Bonoua, Quartier Château — à proximité de la Paroisse Marie Mère de la Divine Providence'::text),
  true
)
where key = 'contact';
