/// <reference types="cypress" />
// @ts-check

let driverOne = {};
let driverTwo = {};
const resetData = ()=>{
  driverOne = {
    username: "driver_one",
    password: "password",
    firstName: "selam",
    image: "employee_1.jpg",
    lastName: "girma",
    gender: "female",
    birthDate: "2000-02-01",
    email: "driverOne@gmail.com",
    phoneNumber: "0911239048",
  };
  driverTwo = {
    username: "driver_two",
    password: "password",
    firstName: "tigit",
    lastName: "girma",
    gender: "female",
    image: "employee_2.jpg",
    birthDate: "1999-02-01",
    email: "driverTwo@gmail.com",
    phoneNumber: "0911239048",
  }
  cy.resetData()

}
describe("create driver", () => {
  beforeEach(() => {
    resetData();
  });
  it("check create driver functionality successfully adds a new driver", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      driverOne.image,
      driverOne.email,
      driverOne.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("createDriver");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createDriver").its("response.statusCode").should("eq", 200);
  });
  it("check create driver with an existing username", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("driverOneCreate");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@driverOneCreate");
    driverTwo["username"] = driverOne["username"];
    cy.typeEmployeeData(
      driverTwo.username,
      driverTwo.password,
      driverTwo.firstName,
      driverTwo.lastName,
      driverTwo.gender,
      driverTwo.birthDate
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("driverTwoCreate");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@driverTwoCreate")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it("check create driver with an existing email", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      null,
      driverOne.email
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("driverOneCreate");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@driverOneCreate");
    driverTwo["email"] = driverOne["email"];
    cy.typeEmployeeData(
      driverTwo.username,
      driverTwo.password,
      driverTwo.firstName,
      driverTwo.lastName,
      driverTwo.gender,
      driverTwo.birthDate,
      null,
      driverTwo.email
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("driverTwoCreate");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@driverTwoCreate")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it(" check create driver with an existing phone number", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      null,
      driverOne.email,
      driverOne.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("driverOneCreate");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@driverOneCreate");
    driverTwo["phoneNumber"] = driverOne["phoneNumber"];
    cy.typeEmployeeData(
      driverTwo.username,
      driverTwo.password,
      driverTwo.firstName,
      driverTwo.lastName,
      driverTwo.gender,
      driverTwo.birthDate,
      null,
      driverTwo.email,
      driverTwo.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("driverTwoCreate");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@driverTwoCreate")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it("verify  create driver with invalid email", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    driverOne.email = "abebe{enter}";
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      null,
      driverOne.email,
      driverOne.phoneNumber
    );
    cy.get("[data-cy=email-error]").should("contain.text", "invalid email");
  });

  it("verify  create driver with invalid phone number", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    driverOne.phoneNumber = "09111234{enter}";
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      null,
      driverOne.email,
      driverOne.phoneNumber
    );
    cy.get("[data-cy=phonenumber-error]").should(
      "contain.text",
      "invalid phone number"
    );
  });

  it("verify  create driver with invalid username", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    driverOne.username = "{enter}";
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      null,
      driverOne.email,
      driverOne.phoneNumber
    );
    cy.get("[data-cy=username-error]").should(
      "contain.text",
      "username is required"
    );
  });
});

describe("delete driver", () => {
  beforeEach(() => {
    resetData();
  });
  it("check delete driver functionality deletes driver", () => {
    cy.adminLogin();
    cy.selectNavMenu(1);
    cy.get("[data-cy=add-driver]").click();
    cy.typeEmployeeData(
      driverOne.username,
      driverOne.password,
      driverOne.firstName,
      driverOne.lastName,
      driverOne.gender,
      driverOne.birthDate,
      null,
      driverOne.email,
      driverOne.phoneNumber
    );
    cy.intercept("POST", `${Cypress.env("API")}/drivers`).as("createDriverForDelete");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createDriverForDelete").its("response.statusCode").should("eq", 200);

    cy.get("[data-cy=back_button]").click();
    cy.get("[data-cy=driver]").should("have.length", 1);
    cy.intercept("DELETE", `${Cypress.env("API")}/drivers/*`).as(
      "deleteDriver"
    );
    cy.get("[data-cy=delete-driver]").click({ force: true });
    cy.get("[data-cy=confirm-delete]").click();
    cy.wait("@deleteDriver").its("response.statusCode").should("eq", 200);
  });
});
