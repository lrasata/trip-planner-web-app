/// <reference types="cypress" />

describe("Home page", () => {
  it("should load correctly", () => {
    cy.visit("http://localhost:5174");
    cy.contains("Trip planner");
    // check the menu
    cy.contains("button", "Home").should("exist");
    cy.contains("button", "Log in").should("exist");
    // check that the logo is loaded
    cy.get('img[alt="Trip planner logo"]')
      .should("be.visible")
      .and(($img) => {
        // Check that the image has loaded by looking at its naturalWidth
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
