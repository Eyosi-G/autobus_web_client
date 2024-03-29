/// <reference types="cypress" />
// @ts-check
import * as action from "../../../src/store/auth/actions";

describe("check authentication", () => {
  beforeEach(() => {
    cy.resetData()
  });

  it("check login with valid username and valid password", () => {
    cy.visit("/login");
    cy.window().its("store").invoke("dispatch", action.logout);
    cy.intercept("POST", `${Cypress.env("API")}/auth/login`).as("login");
    cy.typeCredentials("admin", "Password@123");
    cy.wait("@login");
    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/admin/dashboard"
    );
  });

  it("check login with valid username and invalid password", () => {
    cy.visit("/login");
    cy.intercept("POST", `${Cypress.env("API")}/auth/login`).as("login");
    cy.typeCredentials("admin", "12345678");
    cy.wait("@login").its("response.statusCode").should("eq", 401)
  });

  it("check login with invalid username and invalid password", () => {
    cy.visit("/login");
    cy.intercept("POST", `${Cypress.env("API")}/auth/login`).as("login");
    cy.typeCredentials("user1", "12345678");
    cy.wait("@login").its("response.statusCode").should("eq", 401)
  });
});


