export function logAdmin(): void {
  const password = Cypress.env("TEST_PASSWORD");
  expect(password, "TEST_PASSWORD env must be set").to.exist;

  cy.visit("/login");
  cy.get('input[id="email-login"]').type("admin@admin.com");
  cy.get('input[id="password-login"]').type(password);
  cy.get('button[id="button-submit-login"]').click();

  // expect logged-in home page content
  // Wait longer for logged-in content
  cy.contains("Your journey starts here", { timeout: 3000 }).should("exist");
}
