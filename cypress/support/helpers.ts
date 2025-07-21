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

export function pickDate(datePickerButtonId: string, date: number): void {
  cy.get(`button[id="${datePickerButtonId}"]`).click();
  // Wait for calendar to be visible
  cy.get('[role="dialog"]', { timeout: 3000 }).should("be.visible");
  cy.get('[role="gridcell"]').contains(String(date)).click({ force: true });
}

export function createTrip(tripName: string): void {
  logAdmin();

  cy.get('button[id="create-new-trip"]').click();

  // Fill create trip form
  // Trip name
  cy.get('input[id="trip-name-input"]').type(tripName);
  cy.contains("button", "Continue").click();

  // Departure and arrival location
  // TODO Cannot test due to limitation of wft-geo-db.p.rapidapi.com throwing 429 error (Number of API call limit)
  // Departure country
  // cy.get('input[id="departure-country-input"]').type("Spain");
  // cy.contains("li", "Spain", { timeout: 20000 }).click();
  // // Departure city
  // cy.get('input[id="departure-city-input"]').type("Barcelona");
  // cy.contains("li", "Barcelona (Catalonia)", { timeout: 20000 }).click();
  //
  // // Arrival country
  // cy.get('input[id="arrival-country-input"]').type("France");
  // cy.contains("li", "France", { timeout: 20000 }).click();
  // // Arrival city
  // cy.get('input[id="arrival-city-input"]').type("Rennes");
  // cy.contains("li", "Rennes (Brittany)", { timeout: 20000 }).click();
  cy.contains("button", "Continue").click();

  // Trip participants
  cy.get('input[id="trip-number-participants-input"]').type("1");
  cy.contains("button", "Continue").click();

  // Trip departure and return date
  // Click the calendar button to open the date picker
  pickDate("trip-departure-date-input-button", 20); // Pick the date (e.g., 20th of any month)
  pickDate("trip-return-date-input-button", 27); // Pick the date (e.g., 27th of any month)

  cy.contains("button", "Finish").click();
  // close dialog
  cy.get('button[id="close-dialog"]').click();
}
