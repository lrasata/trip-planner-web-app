/// <reference types="cypress" />

import { logAdmin } from "../support/helpers";

describe("Log out", () => {
  it("should display user profile successfully", () => {
    logAdmin();

    cy.contains("button", "Log out").click();

    // Menu for unauthenticated user
    cy.contains("button", "Sign up").should("exist");
    cy.contains("button", "Log in").should("exist");

    // expect input fields to appear
    cy.get('input[id="email-login"]').should("exist");
    cy.get('input[id="password-login"]').should("exist");
    cy.get('button[id="button-submit-login"]')
      .should("be.visible")
      .and("contain", "Log in");

    // Menu for authenticated user
    cy.contains("button", "All trips").should("not.exist");
    cy.contains("button", "Profile").should("not.exist");
    cy.contains("button", "Log out").should("not.exist");
  });
});
