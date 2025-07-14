/// <reference types="cypress" />

import { logAdmin } from "../support/helpers";

describe("Create trip", () => {
  it("should create a trip successfully through the dialog", () => {
    logAdmin();

    cy.get('button[id="create-new-trip"]').click();

    // Fill create trip form
    // Trip name
    cy.get('input[id="trip-name-input"]').type("Test trip");
    cy.contains("button", "Continue").click();

    // Departure and arrival location
    // TODO Cannot test due to limitation of wft-geo-db.p.rapidapi.com throwing 429 error (Number of API call limit)
    // Departure country
    // cy.get('input[id="departure-country-input"]').type("Spain");
    // cy.contains("li", "Spain", { timeout: 20000 }).click();
    // // Departure city
    // cy.get('input[id="departure-city-input"]').type("Barcelona");
    // cy.contains("li", "Barcelona (Catalonia)", { timeout: 20000 }).click();
    //
    // // Arrival country
    // cy.get('input[id="arrival-country-input"]').type("France");
    // cy.contains("li", "France", { timeout: 20000 }).click();
    // // Arrival city
    // cy.get('input[id="arrival-city-input"]').type("Rennes");
    // cy.contains("li", "Rennes (Brittany)", { timeout: 20000 }).click();
    cy.contains("button", "Continue").click();

    // Trip participants
    cy.get('input[id="trip-number-participants-input"]').type("1");
    cy.contains("button", "Continue").click();

    // Trip departure and return date
    cy.get('input[id="trip-departure-date-input"]').type("20-07-2025", {
      force: true,
    });
    cy.get('input[id="trip-return-date-input"]').type("27-07-2025", {
      force: true,
    });

    cy.contains("button", "Finish").click();
    // close dialog
    cy.get('button[id="close-dialog"]').click();

    // Test trip should have been created
    cy.contains("Test trip", { timeout: 3000 }).should("exist");

    // visit all-trips
    cy.contains("button", "All trips").click();
    // created Trip is listed
    cy.contains("Test trip", { timeout: 3000 }).should("exist");
  });
});
