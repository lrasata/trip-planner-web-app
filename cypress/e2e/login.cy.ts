/// <reference types="cypress" />

describe("Login", () => {
  it("should load correctly", () => {
    cy.visit("http://localhost:5174");

    // click on Log in button
    cy.contains("button", "Log in").click();

    // expect input fields email and password to appear
    cy.get('input[id="email-login"]').should("exist");
    cy.get('input[id="password-login"]').should("exist");
    cy.get('button[id="button-submit-login"]')
      .contains("Log in")
      .should("be.visible");

    cy.visit("http://localhost:5174/login");

    // expect input fields email and password to appear
    cy.get('input[id="email-login"]').should("exist");
    cy.get('input[id="password-login"]').should("exist");
    cy.get('button[id="button-submit-login"]')
      .contains("Log in")
      .should("be.visible");
  });
  it("fills email and submits the form successfully by loading logged in homepage", () => {
    cy.visit("/login"); // go to login page
    cy.get('input[id="email-login"]').type("admin@admin.com");
    const password = Cypress.env('TEST_PASSWORD');
    cy.get('input[id="password-login"]').type(password);
    cy.get('button[id="button-submit-login"]').click();

    cy.contains("Your planned trip");
    cy.get('button[id="create-new-trip"]').should("exist");
  });
});
