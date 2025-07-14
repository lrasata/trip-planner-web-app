/// <reference types="cypress" />

import { logAdmin } from "../support/helpers";

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
    logAdmin();
    cy.get('button[id="create-new-trip"]').should("exist");
  });
});
