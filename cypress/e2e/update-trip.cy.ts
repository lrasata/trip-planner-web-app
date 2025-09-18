/// <reference types="cypress" />

import { createTrip, pickDate } from "../support/helpers";

describe("Update trip", () => {
  it("should update a trip accordingly", () => {
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
    cy.contains(tripName, { timeout: 3000 }).should("exist");
    cy.get(`button[id="edit-trip-name-description-btn"]`).click();

    // check trip name and description in input
    cy.get('input[id="edit-trip-name-input"]').should("have.value", tripName);
    cy.get('input[id="edit-trip-description-input"]').should("have.value", "");

    cy.get('input[id="edit-trip-name-input"]').type(" updated");
    cy.get('input[id="edit-trip-description-input"]').type(
      "adding some description",
    );

    cy.get(`button[id="save-trip-name-description-btn"]`).click();

    cy.contains(`${tripName} updated`, { timeout: 3000 }).should("exist");
    cy.contains("adding some description", { timeout: 3000 }).should("exist");

    // Update departure and return date which are valid
    pickDate("edit-departure-date-input-button", 21);
    pickDate("edit-return-date-input-button", 28);

    cy.get(`button[id="save-edit-date-destination-btn"]`).click();

    cy.contains("Changes saved successfully").should("exist");
  });
});
