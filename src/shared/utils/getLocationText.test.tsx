import { describe, it, expect } from "vitest";
import type { ILocation } from "@/types";
import getLocationText from "./getLocationText.ts";

describe("getLocationText", () => {
  it("returns joined city, region, and country", () => {
    const location: ILocation = {
      city: "Paris",
      region: "Île-de-France",
      country: "France",
      countryCode: "FR",
    };
    expect(getLocationText(location)).toBe("Paris, Île-de-France, France");
  });

  it("omits empty fields", () => {
    const location: ILocation = {
      city: "Paris",
      region: "",
      country: "France",
      countryCode: "FR",
    };
    expect(getLocationText(location)).toBe("Paris, France");
  });

  it("returns undefined if location is undefined", () => {
    expect(getLocationText(undefined)).toBeUndefined();
  });

  it("returns only existing parts", () => {
    const location: ILocation = {
      city: "",
      region: "",
      country: "France",
      countryCode: "FR",
    };
    expect(getLocationText(location)).toBe("France");
  });

  it("returns empty string if all fields are empty strings", () => {
    const location: ILocation = {
      city: "",
      region: "",
      country: "",
      countryCode: "",
    };
    expect(getLocationText(location)).toBe("");
  });
});
