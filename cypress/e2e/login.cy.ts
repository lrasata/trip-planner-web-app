/// <reference types="cypress" />

describe("Login", () => {
  it("should navigate to login page when clicking 'Log in'", () => {
    cy.visit("/");

    cy.contains("button", "Log in").click();

    // check URL includes /login
    cy.url().should("include", "/login");

    // expect input fields to appear
    cy.get('input[id="email-login"]').should("exist");
    cy.get('input[id="password-login"]').should("exist");
    cy.get('button[id="button-submit-login"]')
      .should("be.visible")
      .and("contain", "Log in");
  });

  it("should load login page directly", () => {
    cy.visit("/login");

    cy.get('input[id="email-login"]').should("exist");
    cy.get('input[id="password-login"]').should("exist");
    cy.get('button[id="button-submit-login"]')
      .should("be.visible")
      .and("contain", "Log in");
  });

  it("should log in successfully and show logged in homepage", () => {
    const password = Cypress.env("TEST_PASSWORD");
    expect(password, "TEST_PASSWORD env must be set").to.exist;

    cy.visit("/login");
    cy.get('input[id="email-login"]').type("admin@admin.com");
    cy.get('input[id="password-login"]').type(password);
    cy.get('button[id="button-submit-login"]').click();

    // expect logged-in home page content
    // Wait longer for logged-in content
    cy.contains("Your planned trip", { timeout: 10000 }).should("exist");
    cy.get('button[id="create-new-trip"]').should("exist");
  });
});
