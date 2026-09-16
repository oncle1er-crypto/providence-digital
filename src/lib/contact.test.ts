import { describe, expect, it } from "vitest";

import { telHref, toE164, whatsappHref } from "./contact";

describe("contact", () => {
  it("normalise un numéro affiché en format international", () => {
    expect(toE164("(+225) 05 65 25 76 93")).toBe("+2250565257693");
    expect(toE164("07 14 76 78 08")).toBe("0714767808");
  });

  it("construit un lien tel:", () => {
    expect(telHref("(+225) 05 65 25 76 93")).toBe("tel:+2250565257693");
  });

  it("construit un lien WhatsApp sans le « + »", () => {
    expect(whatsappHref("(+225) 05 65 25 76 93")).toBe("https://wa.me/2250565257693");
  });
});
