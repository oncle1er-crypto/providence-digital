const SUPABASE_URL = (
  import.meta.env["VITE_SUPABASE_URL"] || "https://laujoixondbpzdsmdfko.supabase.co"
).replace(/\/$/, "");

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
  "sb_publishable_xGQro0faYiaIqjf4qmN52g_cQHx3Scc";

const SESSION_KEY = "providence-cms-session";

export type CmsUser = {
  id: string;
  email?: string;
};

export type CmsSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  expires_at?: number;
  user?: CmsUser;
};

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category: string | null;
  image_path: string | null;
  video_url: string | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  sort_order: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaAsset = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  kind: "image" | "video" | "document";
  is_public: boolean;
  created_by: string | null;
  created_at: string;
};

export type SiteSetting<T = Record<string, unknown>> = {
  key: string;
  value: T;
  public_visible: boolean;
  updated_by: string | null;
  updated_at: string;
};

export type IdentitySetting = {
  school_name?: string;
  website?: string;
};

export type ContactSetting = {
  address?: string;
  phone?: string;
  email?: string;
};

export type AdmissionsSetting = {
  eyebrow?: string;
  title?: string;
  message?: string;
  cta_label?: string;
  cta_url?: string;
};

type Json = Record<string, unknown> | unknown[] | string | number | boolean | null;

export type PreRegistrationInput = {
  guardian_name: string;
  email: string;
  phone: string;
  child_name: string;
  child_age: number;
  desired_level: "Maternelle" | "Primaire" | "Collège" | "Lycée";
  message: string | null;
};

function authHeaders(session?: CmsSession, json = true): HeadersInit {
  const headers: Record<string, string> = {
    apikey: SUPABASE_PUBLISHABLE_KEY,
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text
    ? (JSON.parse(text) as T | { message?: string; error_description?: string })
    : null;

  if (!response.ok) {
    const errorPayload = payload as { message?: string; error_description?: string } | null;
    throw new Error(
      errorPayload?.error_description ||
        errorPayload?.message ||
        `Erreur Supabase (${response.status})`,
    );
  }

  return payload as T;
}

export async function submitPreRegistration(input: PreRegistrationInput): Promise<void> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/pre_registration_requests`, {
    method: "POST",
    headers: {
      ...authHeaders(undefined),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) await parseResponse<Json>(response);
}

function saveSession(session: CmsSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }

  const normalized: CmsSession = { ...session };
  if (!normalized.expires_at && normalized.expires_in) {
    normalized.expires_at = Math.floor(Date.now() / 1000) + normalized.expires_in;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
}

export function readStoredSession(): CmsSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CmsSession;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export async function refreshSession(session: CmsSession): Promise<CmsSession> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: authHeaders(undefined),
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });
  const next = await parseResponse<CmsSession>(response);
  saveSession(next);
  return next;
}

export async function getSession(): Promise<CmsSession | null> {
  const session = readStoredSession();
  if (!session) return null;

  const expiresAt = session.expires_at || 0;
  if (expiresAt && expiresAt < Math.floor(Date.now() / 1000) + 60) {
    try {
      return await refreshSession(session);
    } catch {
      saveSession(null);
      return null;
    }
  }

  return session;
}

export async function signIn(email: string, password: string): Promise<CmsSession> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: authHeaders(undefined),
    body: JSON.stringify({ email, password }),
  });
  const session = await parseResponse<CmsSession>(response);
  saveSession(session);
  return session;
}

export async function signUp(
  email: string,
  password: string,
): Promise<CmsSession | { user?: CmsUser }> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: authHeaders(undefined),
    body: JSON.stringify({ email, password }),
  });
  const result = await parseResponse<CmsSession | { user?: CmsUser }>(response);
  if ("access_token" in result && result.access_token) saveSession(result as CmsSession);
  return result;
}

export async function signOut(session: CmsSession | null) {
  try {
    if (session?.access_token) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: authHeaders(session, false),
      });
    }
  } finally {
    saveSession(null);
  }
}

export async function getCurrentUser(session: CmsSession): Promise<CmsUser> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: authHeaders(session, false),
  });
  return parseResponse<CmsUser>(response);
}

export async function isCmsAdmin(session: CmsSession): Promise<boolean> {
  const user = session.user || (await getCurrentUser(session));
  session.user = user;
  saveSession(session);

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/admin_users?select=user_id,role,is_active&user_id=eq.${encodeURIComponent(user.id)}&is_active=eq.true`,
    { headers: authHeaders(session, false) },
  );
  const rows = await parseResponse<Array<{ user_id: string }>>(response);
  return rows.length > 0;
}

export async function claimFirstAdmin(session: CmsSession, token: string): Promise<boolean> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/claim_cms_admin`, {
    method: "POST",
    headers: authHeaders(session),
    body: JSON.stringify({ p_token: token }),
  });
  return parseResponse<boolean>(response);
}

export async function getPublicNews(limit = 12): Promise<NewsPost[]> {
  const now = encodeURIComponent(new Date().toISOString());
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/news_posts?select=*&status=eq.published&published_at=lte.${now}&order=sort_order.asc,published_at.desc&limit=${limit}`,
    { headers: authHeaders(undefined, false) },
  );
  return parseResponse<NewsPost[]>(response);
}

export async function getAdminNews(session: CmsSession): Promise<NewsPost[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/news_posts?select=*&order=created_at.desc`,
    { headers: authHeaders(session, false) },
  );
  return parseResponse<NewsPost[]>(response);
}

export async function saveNews(
  session: CmsSession,
  input: Partial<NewsPost> & Pick<NewsPost, "title" | "slug" | "body" | "status">,
  id?: string,
): Promise<NewsPost> {
  const user = session.user || (await getCurrentUser(session));
  const body = {
    ...input,
    updated_by: user.id,
    ...(id ? {} : { created_by: user.id }),
  };

  const response = await fetch(
    id
      ? `${SUPABASE_URL}/rest/v1/news_posts?id=eq.${encodeURIComponent(id)}`
      : `${SUPABASE_URL}/rest/v1/news_posts`,
    {
      method: id ? "PATCH" : "POST",
      headers: {
        ...authHeaders(session),
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    },
  );
  const rows = await parseResponse<NewsPost[]>(response);
  if (!rows[0]) throw new Error("Aucune actualité retournée après enregistrement.");
  return rows[0];
}

export async function deleteNews(session: CmsSession, id: string) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/news_posts?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: authHeaders(session, false),
    },
  );
  if (!response.ok) await parseResponse<Json>(response);
}

export async function getPublicSetting<T>(key: string): Promise<SiteSetting<T> | null> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/site_settings?select=*&key=eq.${encodeURIComponent(key)}&public_visible=eq.true&limit=1`,
    { headers: authHeaders(undefined, false) },
  );
  const rows = await parseResponse<SiteSetting<T>[]>(response);
  return rows[0] || null;
}

export async function getAdminSettings(session: CmsSession): Promise<SiteSetting[]> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=*&order=key.asc`, {
    headers: authHeaders(session, false),
  });
  return parseResponse<SiteSetting[]>(response);
}

export async function saveSetting<T extends Record<string, unknown>>(
  session: CmsSession,
  key: string,
  value: T,
  publicVisible = true,
): Promise<SiteSetting<T>> {
  const user = session.user || (await getCurrentUser(session));
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?on_conflict=key`, {
    method: "POST",
    headers: {
      ...authHeaders(session),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({ key, value, public_visible: publicVisible, updated_by: user.id }),
  });
  const rows = await parseResponse<SiteSetting<T>[]>(response);
  if (!rows[0]) throw new Error("Le réglage n'a pas pu être enregistré.");
  return rows[0];
}

export function mediaPublicUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/cms-media/${path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

export async function getMediaAssets(session: CmsSession): Promise<MediaAsset[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/media_assets?select=*&order=created_at.desc`,
    {
      headers: authHeaders(session, false),
    },
  );
  return parseResponse<MediaAsset[]>(response);
}

export async function uploadMedia(
  session: CmsSession,
  file: File,
  altText = "",
): Promise<MediaAsset> {
  const user = session.user || (await getCurrentUser(session));
  const safeName = file.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  const path = `${user.id}/${Date.now()}-${safeName || "media"}`;
  const encodedPath = path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/cms-media/${encodedPath}`, {
    method: "POST",
    headers: {
      ...authHeaders(session, false),
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  });
  if (!uploadResponse.ok) await parseResponse<Json>(uploadResponse);

  const kind: MediaAsset["kind"] = file.type.startsWith("video/")
    ? "video"
    : file.type === "application/pdf"
      ? "document"
      : "image";

  const response = await fetch(`${SUPABASE_URL}/rest/v1/media_assets`, {
    method: "POST",
    headers: {
      ...authHeaders(session),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      storage_path: path,
      alt_text: altText || null,
      kind,
      is_public: true,
      created_by: user.id,
    }),
  });
  const rows = await parseResponse<MediaAsset[]>(response);
  if (!rows[0]) throw new Error("Le média a été téléversé mais son index n'a pas pu être créé.");
  return rows[0];
}

export async function deleteMedia(session: CmsSession, asset: MediaAsset) {
  const encodedPath = asset.storage_path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const storageResponse = await fetch(
    `${SUPABASE_URL}/storage/v1/object/cms-media/${encodedPath}`,
    {
      method: "DELETE",
      headers: authHeaders(session, false),
    },
  );
  if (!storageResponse.ok) await parseResponse<Json>(storageResponse);

  const dbResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/media_assets?id=eq.${encodeURIComponent(asset.id)}`,
    { method: "DELETE", headers: authHeaders(session, false) },
  );
  if (!dbResponse.ok) await parseResponse<Json>(dbResponse);
}

export { SUPABASE_URL };
