/// <reference types="cypress" />

import { createTrip, logAdmin } from "../support/helpers";

describe("Your trips", () => {
  it("should display existing trips", () => {
    logAdmin();

    // visit all-trips
    cy.contains("button", "Your trips").click();
    cy.contains("All your trips").should("exist");
    cy.get('input[id="search-bar"]').should("exist");
    cy.contains("No trip found.").should("not.exist");
  });

  it("should filter trips and render matching trip", () => {
    const tripName = "Your trip";
    createTrip(tripName);

    // visit all-trips
    cy.contains("button", "Your trips").click();
    cy.get('input[id="search-bar"]').should("exist");

    cy.get('input[id="search-bar"]').type("trip");
    cy.contains("Your trip").should("exist");
  });

  it("should filter trips and render Not found on non existing trip", () => {
    logAdmin();

    // visit all-trips
    cy.contains("button", "Your trips").click();
    cy.get('input[id="search-bar"]').should("exist");

    cy.get('input[id="search-bar"]').type("zzzzz");
    cy.contains("No trip found.").should("exist");
  });
});
