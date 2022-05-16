/// <reference types="cypress" />
// @ts-check

let ticketerOne = {};
let ticketerTwo = {};

const resetTicketerData = () => {
  ticketerOne = {
    username: "ticketer_one",
    password: "password",
    firstName: "hiwot",
    lastName: "girma",
    gender: "female",
    birthDate: "2000-02-01",
    email: "ticketerOne@gmail.com",
    phoneNumber: "0913339048",
  };
  ticketerTwo = {
    username: "ticketer_two",
    password: "password",
    firstName: "tigit",
    lastName: "girma",
    gender: "female",
    birthDate: "1999-02-01",
    email: "ticketerTwo@gmail.com",
    phoneNumber: "0911239048",
  };
  cy.resetData();
};
describe("create ticketer", () => {
  beforeEach(() => {
    resetTicketerData();
  });
  it("check create ticketer functionality successfully adds a new ticketer", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email,
      ticketerOne.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "createTicketer"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createTicketer").its("response.statusCode").should("eq", 200);
  });
  it("check create ticketer with an existing username", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "ticketerOneCreate"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@ticketerOneCreate");
    ticketerTwo["username"] = ticketerOne["username"];
    cy.typeEmployeeData(
      ticketerTwo.username,
      ticketerTwo.password,
      ticketerTwo.firstName,
      ticketerTwo.lastName,
      ticketerTwo.gender,
      ticketerTwo.birthDate
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "ticketerTwoCreate"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@ticketerTwoCreate")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it("check create ticketer with an existing email", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "ticketerOneCreate"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@ticketerOneCreate");
    ticketerTwo["email"] = ticketerOne["email"];
    cy.typeEmployeeData(
      ticketerTwo.username,
      ticketerTwo.password,
      ticketerTwo.firstName,
      ticketerTwo.lastName,
      ticketerTwo.gender,
      ticketerTwo.birthDate,
      null,
      ticketerTwo.email
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "ticketerTwoCreate"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@ticketerTwoCreate")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it(" check create ticketer with an existing phone number", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email,
      ticketerOne.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "ticketerOneCreate"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@ticketerOneCreate");
    ticketerTwo["phoneNumber"] = ticketerOne["phoneNumber"];
    cy.typeEmployeeData(
      ticketerTwo.username,
      ticketerTwo.password,
      ticketerTwo.firstName,
      ticketerTwo.lastName,
      ticketerTwo.gender,
      ticketerTwo.birthDate,
      null,
      ticketerTwo.email,
      ticketerTwo.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "ticketerTwoCreate"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@ticketerTwoCreate")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it("verify  create ticketer with invalid email", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    ticketerOne.email = "abebe{enter}";
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email,
      ticketerOne.phoneNumber
    );
    cy.get("[data-cy=email-error]").should("contain.text", "invalid email");
  });

  it("verify  create ticketer with invalid phone number", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    ticketerOne.phoneNumber = "09111234{enter}";
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email,
      ticketerOne.phoneNumber
    );
    cy.get("[data-cy=phonenumber-error]").should(
      "contain.text",
      "invalid phone number"
    );
  });

  it("verify create ticketer with invalid username", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    ticketerOne.username = "{enter}";
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email,
      ticketerOne.phoneNumber
    );
    cy.get("[data-cy=username-error]").should(
      "contain.text",
      "username is required"
    );
  });
});

describe("delete ticketer", () => {
  beforeEach(() => {
    resetTicketerData();
  });
  it("check delete ticketer functionality deletes ticketer", () => {
    cy.adminLogin();
    cy.selectNavMenu(2);
    cy.get("[data-cy=add-ticketer]").click();
    cy.typeEmployeeData(
      ticketerOne.username,
      ticketerOne.password,
      ticketerOne.firstName,
      ticketerOne.lastName,
      ticketerOne.gender,
      ticketerOne.birthDate,
      null,
      ticketerOne.email,
      ticketerOne.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/ticketers`).as(
      "createTicketerForDelete"
    );
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createTicketerForDelete")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("[data-cy=back_button").click();
    cy.get("[data-cy=ticketer]").should("have.length", 1);
    cy.intercept("DELETE", `${Cypress.env("API")}/ticketers/*`).as(
      "deleteTicketer"
    );
    cy.get("[data-cy=delete-ticketer]").click({ force: true });
    cy.get("[data-cy=confirm-delete]").click();
    cy.wait("@deleteTicketer").its("response.statusCode").should("eq", 200);
  });
});
