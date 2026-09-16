import { describe, expect, it } from "vitest";

import { absoluteUrl, OG_IMAGE, SITE_HOST, SITE_URL } from "./seo";

describe("seo", () => {
  it("construit des URL absolues", () => {
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
    expect(absoluteUrl("admissions")).toBe(`${SITE_URL}/admissions`);
    expect(absoluteUrl("/formations/maternelle")).toBe(`${SITE_URL}/formations/maternelle`);
  });

  it("expose un domaine sans protocole ni slash final", () => {
    expect(SITE_HOST).not.toMatch(/^https?:\/\//);
    expect(SITE_HOST).not.toMatch(/\/$/);
  });

  it("déclare une image de partage aux dimensions attendues", () => {
    expect(OG_IMAGE.width).toBe(1200);
    expect(OG_IMAGE.height).toBe(630);
    expect(OG_IMAGE.url).toContain(SITE_URL);
  });
});
