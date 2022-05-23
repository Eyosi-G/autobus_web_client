/// <reference types="cypress" />
// @ts-check

describe("create bus stat", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check create bus stat functionality creates bus stat", () => {
    cy.adminLogin();
    cy.selectNavMenu(5);
    cy.intercept("GET", `${Cypress.env("API")}/buses?page=0&limit=100`).as(
      "fetchBuses"
    );
    cy.get("[data-cy=new-bus-stats]").click();
    cy.wait("@fetchBuses");
    const today = new Date().toISOString().split("T")[0];
    cy.typeBusStat(today, 1, 100, 200);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStat");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStat").its("response.statusCode").should("eq", 200);
  });

  it("check create bus stat functionality with an existing date and bus number", () => {
    cy.adminLogin();
    cy.selectNavMenu(5);
    cy.intercept("GET", `${Cypress.env("API")}/buses?page=0&limit=100`).as(
      "fetchBuses"
    );
    cy.get("[data-cy=new-bus-stats]").click();
    cy.wait("@fetchBuses");
    const today = new Date().toISOString().split("T")[0];
    cy.typeBusStat(today, 1, 100, 200);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStat");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStat").its("response.statusCode").should("eq", 200);
    cy.typeBusStat(today, 1, 300, 200);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStat2");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStat2").its("response.statusCode").should("not.eq", 200);
  });
});

describe("update bus stat", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check update bus stat functionality updates bus stat", () => {
    cy.adminLogin();
    cy.intercept("GET", `${Cypress.env("API")}/stats?page=*&limit=*`).as(
      "fetchStats"
    );
    cy.selectNavMenu(5);
    cy.wait("@fetchStats");

    //create bus
    cy.intercept("GET", `${Cypress.env("API")}/buses?page=0&limit=100`).as(
      "fetchBuses"
    );
    cy.get("[data-cy=new-bus-stats]").click();
    cy.wait("@fetchBuses");
    cy.typeBusStat("2022-01-01", 1, 100, 200);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStat");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStat").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=back_button]").click();
    //check edit bus stat works
    cy.wait("@fetchStats").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=stat-edit]").first().click({ force: true });
    cy.typeBusStat("2022-01-01", 1, 200, 200);
    cy.intercept("PATCH", `${Cypress.env("API")}/stats/*`).as("updateStat");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@updateStat").its("response.statusCode").should("eq", 200);
  });

  it("check update bus stat functionality with an existing date and bus number", () => {
    cy.adminLogin();
    cy.intercept("GET", `${Cypress.env("API")}/stats?page=*&limit=*`).as(
      "fetchStats"
    );
    cy.selectNavMenu(5);
    cy.wait("@fetchStats");
    //create bus stat one
    cy.intercept("GET", `${Cypress.env("API")}/buses?page=0&limit=100`).as(
      "fetchBusesOne"
    );
    cy.get("[data-cy=new-bus-stats]").click();
    cy.wait("@fetchBusesOne");
    cy.typeBusStat("2022-02-02", 1, 100, 200);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStatOne");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStatOne").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=back_button]").click();
    //create bus stat two
    cy.intercept("GET", `${Cypress.env("API")}/buses?page=0&limit=100`).as(
      "fetchBusesTwo"
    );
    cy.get("[data-cy=new-bus-stats]").click();
    cy.wait("@fetchBusesTwo");
    cy.typeBusStat("2022-02-03", 1, 100, 100);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStatTwo");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStatTwo").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=back_button]").click();
    //check edit bus
    // cy.wait("@fetchStatsThree").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=stat-edit]").last().click({ force: true });
    cy.typeBusStat("2022-02-02", 1, 200, 200);
    cy.intercept("PATCH", `${Cypress.env("API")}/stats/*`).as("updateStat");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@updateStat").its("response.statusCode").should("not.eq", 200);
  });
});

describe("delete bus stat", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check delete bus stat functionality deletes bus stat", () => {
    cy.adminLogin();
    cy.intercept("GET", `${Cypress.env("API")}/stats?page=*&limit=*`).as(
      "fetchStats"
    );
    cy.selectNavMenu(5);
    //create bus stat one
    cy.intercept("GET", `${Cypress.env("API")}/buses?page=0&limit=100`).as(
      "fetchBuses"
    );
    cy.get("[data-cy=new-bus-stats]").click();
    cy.wait("@fetchBuses");
    cy.typeBusStat("2022-02-02", 1, 100, 200);
    cy.intercept("POST", `${Cypress.env("API")}/stats`).as("createStat");
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createStat").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=back_button]").click();
    cy.intercept("DELETE", `${Cypress.env("API")}/stats/*`).as("deleteStat");
    cy.get("[data-cy=stat-delete]").should("exist").click({ force: true });
    cy.get("[data-cy=confirm-delete]").click();
    cy.wait("@deleteStat").its("response.statusCode").should("eq", 200);
  });
});
