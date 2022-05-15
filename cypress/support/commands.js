// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("typeCredentials", (username, password) => {
  cy.get("[data-cy=username]").type(username);
  cy.get("[data-cy=password]").type(`${password}{enter}`);
});

Cypress.Commands.add("resetData", () => {
  cy.request("POST", "http://localhost:8080/reset");
});

Cypress.Commands.add("adminLogin", () => {
  cy.visit("/login");
  cy.intercept("POST", `${Cypress.env("API")}/auth/login`).as("login");
  cy.fixture("auth.json").then(({ username, password }) => {
    cy.typeCredentials(username, password);
  });
  cy.wait("@login").its("response.statusCode").should("eq", 200)
  cy.location("pathname", { timeout: 10000 }).should(
    "eq",
    "/admin/dashboard"
  );
});

Cypress.Commands.add("selectNavMenu", (_index) => {
  cy.get("[data-cy=nav-menu]").each(($el, index) => {
    if (index === _index) {
      cy.wrap($el).click();
    }
  });
});

Cypress.Commands.add(
  "typeEmployeeData",
  (
    username,
    password,
    firstName,
    lastName,
    gender,
    birthDate,
    image,
    email,
    phonenumber
  ) => {
    if (image) {
      cy.get("[data-cy=image]").attachFile("images/"+image);
    }
    cy.get("[data-cy=first-name]").type(firstName);
    cy.get("[data-cy=last-name]").type(lastName);
    if (phonenumber) {
      cy.get("[data-cy=phone-number]").type(phonenumber);
    }
    if (email) {
      cy.get("[data-cy=email]").type(email);
    }
    if(gender === "male"){
        cy.get("[data-cy=gender-male]").check()
    }else{
        cy.get("[data-cy=gender-female]").check()
    }
    cy.get("[data-cy=birth_date]").type(birthDate);
    cy.get("[data-cy=username").type(username);
    cy.get("[data-cy=password").type(password);
  }
);
