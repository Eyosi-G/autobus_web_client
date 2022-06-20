/// <reference types="cypress" />
// @ts-check
const createBus = (sideNumber, capacity) => {
  cy.get("[data-cy=new_bus]").click();
  cy.intercept("POST", `${Cypress.env("API")}/buses`).as("busCreate");
  cy.get("[data-cy=side_number]").should("be.visible").clear().type(sideNumber);
  cy.get("[data-cy=capacity]").should("be.visible").clear().type(capacity);
  cy.get("[data-cy=submit-button]").click();
  cy.wait("@busCreate").its("response.statusCode").should("eq", 200);
  cy.get("[data-cy=close-bus]").should("be.visible").click();
};
describe("create bus", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check create bus functionality successfully adds a new bus", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);
    cy.get("[data-cy=new_bus]").click();
    cy.intercept("POST", `${Cypress.env("API")}/buses`).as("busCreate");
    cy.get("[data-cy=side_number]").should("be.visible").clear().type("3000");
    cy.get("[data-cy=capacity]").should("be.visible").clear().type("200");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@busCreate").its("response.statusCode").should("eq", 200);
  });
  it("check create bus functionality with existing side number", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);
    cy.get("[data-cy=new_bus]").click();
    cy.intercept("POST", `${Cypress.env("API")}/buses`).as("busCreateOne");
    cy.get("[data-cy=side_number]").should("be.visible").clear().type("3000");
    cy.get("[data-cy=capacity]").should("be.visible").clear().type("200");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@busCreateOne").its("response.statusCode").should("eq", 200);
    //create new one
    cy.intercept("POST", `${Cypress.env("API")}/buses`).as("busCreateTwo");
    cy.get("[data-cy=side_number]").should("be.visible").clear().type("3000");
    cy.get("[data-cy=capacity]").should("be.visible").clear().type("250");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@busCreateTwo").its("response.statusCode").should("eq", 401);
  });
});

describe("edit bus", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check edit bus functionality successfully edit a bus", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);
    createBus(2000, 200);
    cy.intercept("PUT", `${Cypress.env("API")}/buses/*`).as("editBus")
    cy.get("[data-cy=edit-bus]").last().click({ force: true });
    cy.get("[data-cy=capacity]").clear().type("250");
    cy.get("[data-cy=submit-button]").click()
    cy.wait("@editBus").its("response.statusCode").should("eq", 200)
  });

  it("check edit bus functionality with existing side number", ()=>{
    cy.adminLogin();
    cy.selectNavMenu(4);
    createBus(2000, 200);
    createBus(2001, 250);
    cy.intercept("PUT", `${Cypress.env("API")}/buses/*`).as("editBus")
    cy.get("[data-cy=edit-bus]").last().click({ force: true });
    cy.get("[data-cy=side_number]").clear().type("2000");
    cy.get("[data-cy=submit-button]").click()
    cy.wait("@editBus").its("response.statusCode").should("eq", 401)
  })
});

describe("delete bus", () => {
  beforeEach(() => {
    cy.resetData();
  });

  it("check delete bus functionality successfully deletes bus", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);
    createBus(2000, 200);
    cy.intercept("DELETE", `${Cypress.env("API")}/buses/*`).as("deleteBus")
    cy.get("[data-cy=delete-bus]").click({force: true})
    cy.get("[data-cy=confirm-delete]").click();
    cy.wait("@deleteBus").its("response.statusCode").should("eq", 200)

  });
});
