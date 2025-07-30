/// <reference types="cypress" />

import { createTrip } from "../support/helpers";

describe("Create trip", () => {
  it("should create a trip successfully through the dialog", () => {
    const tripName = "Create Trip";
    createTrip(tripName);

    // visit all-trips
    cy.contains("button", "Your trips").click();
    // created Trip is listed
    cy.contains(tripName, { timeout: 3000 }).should("exist");
  });
});
