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
    cy.typeCredentials("admin", "adminadmin");
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
    cy.wait("@login");
    cy.get("[data-cy=dialog]").should("have.class", "bg-red-50");
  });

  it("check login with invalid username and invalid password", () => {
    cy.visit("/login");
    cy.intercept("POST", `${Cypress.env("API")}/auth/login`).as("login");
    cy.typeCredentials("user1", "12345678");
    cy.wait("@login");
    cy.get("[data-cy=dialog]").should("have.class", "bg-red-50");
  });
});

describe("login validation", () => {
  it("empty username validation", () => {
    cy.visit("/login");
    cy.get("[data-cy=username]").type("{enter}");
    cy.get("[data-cy=username-error]").contains("Username is required");
  });
  it("empty password validation", () => {
    cy.visit("/login");
    cy.get("[data-cy=password]").type("{enter}");
    cy.get("[data-cy=password-error]").contains("Password is required");
  });
  it("short password validation", () => {
    cy.visit("/login");
    cy.get("[data-cy=password]").type("pass{enter}");
    cy.get("[data-cy=password-error]").contains("Password is too short");
  });
});
