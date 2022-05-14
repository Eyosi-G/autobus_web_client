/// <reference types="cypress" />
// @ts-check
// import * as action from "../../../src/store/auth/actions";

describe("create driver", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check create driver functionality successfully adds a new driver", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    cy.fixture("employees.json").then((data) => {
      const username = data[0]["username"];
      const password = data[0]["password"];
      const firstName = data[0]["first_name"];
      const lastName = data[0]["last_name"];
      const image = data[0]["image"];
      const gender = data[0]["gender"];
      const birthDate = data[0]["birth_date"];
      cy.typeEmployeeData(
        username,
        password,
        firstName,
        lastName,
        gender,
        birthDate,
        image
      );
    });
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("createDriver");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createDriver").its("response.statusCode").should("eq", 200);
  });
});
