insert into public.site_settings (key, value, public_visible)
values
  (
    'contact',
    jsonb_build_object(
      'address', 'Bonoua, Quartier Château — à proximité du Centre Don Orione',
      'phone', '(+225) 05 65 25 76 93',
      'email', 'ecolelaprovidencebonoua@gmail.com'
    ),
    true
  ),
  (
    'admissions',
    jsonb_build_object(
      'eyebrow', 'Admissions ouvertes',
      'title', 'Année scolaire 2026–2027',
      'message', 'Les demandes de préinscription sont ouvertes pour la maternelle, le primaire, le collège et le lycée. La préinscription en ligne est présentée ici à titre de démonstration : la validation se fait auprès du secrétariat.',
      'cta_label', 'Commencer une préinscription',
      'cta_url', '/admissions'
    ),
    true
  )
on conflict (key) do nothing;
