/// <reference types="cypress" />

import { logAdmin } from "../support/helpers";

describe("User profile", () => {
  it("should display user profile successfully", () => {
    logAdmin();

    cy.contains("button", "Profile").click();

    cy.get('input[id="profile-user-name-input"]').should("have.value", "admin");
    cy.get('input[id="profile-user-email-input"]').should(
      "have.value",
      "admin@admin.com",
    );
    cy.get('input[id="profile-user-password-input"]').should("have.value", "");
  });

  // TODO Fix this should work as is...
  // it("should update user profile successfully", () => {
  //   logAdmin();
  //
  //   cy.contains("button", "Profile").click();
  //
  //   cy.get('input[id="profile-user-name-input"]', { timeout: 5000 }).type("1");
  //   cy.get('button[id="submit-profile-update"]').click();
  //
  //   cy.contains("button", "All trips").click();
  //   cy.contains("button", "Profile").click();
  //   cy.get('input[id="profile-user-name-input"]').should(
  //     "have.value",
  //     "admin1",
  //   );
  // });
});
