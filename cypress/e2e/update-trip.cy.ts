/// <reference types="cypress" />

import { createTrip, pickDate } from "../support/helpers";

describe("Update trip", () => {
  it("should not update a trip when departure or return date are invalid", () => {
    const tripName = "Update trip";
    createTrip(tripName);

    // visit all-trips
    cy.contains("button", "Your trips").click();
    // created Trip is listed
    cy.contains(tripName, { timeout: 3000 }).should("exist");

    cy.get(`button[id="${tripName}-trip-manage-button"]`).click();

    // edit page appears
    cy.contains("Manage your trip", { timeout: 3000 }).should("exist");

    // check trip name
    cy.get('input[id="edit-trip-name-input"]').should("have.value", tripName);
    // check description
    cy.get('input[id="edit-trip-description-input"]').should("have.value", "");

    // Update departure and return date which are invalid edit-departure-date-input-button
    pickDate("edit-departure-date-input-button", 27); // Pick the date (e.g., 27th of any month)
    pickDate("edit-return-date-input-button", 20); // Pick the date (e.g., 20th of any month)

    cy.contains("button", "Save updates").click();
    cy.contains("Invalid date").should("exist");

    // Update departure and return date which are valid
    pickDate("edit-departure-date-input-button", 20);
    pickDate("edit-return-date-input-button", 27);

    cy.contains("button", "Save updates").click();

    cy.contains("Changes saved successfully").should("exist");
  });
});
