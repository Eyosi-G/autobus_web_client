/// <reference types="cypress" />
// @ts-check

function getDate(after = 0) {
  const now = new Date();
  now.setDate(now.getDate() + after);
  return now.toISOString().split("T")[0];
}
function createTimeFrame(startDate, endDate) {
  cy.adminLogin();
  cy.selectNavMenu(4);
  cy.get("[data-cy=new_timeframe]").should("be.visible").click();

  cy.intercept("POST", `${Cypress.env("API")}/timeframes`).as(
    "createTimeFrameOne"
  );
  cy.typeTimeFrame(startDate, endDate);
  cy.get("[data-cy=submit-button]").click();
  cy.wait("@createTimeFrameOne").its("response.statusCode").should("eq", 200);
}
describe("create time frame", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check create time frame functionality successfully adds a new Time Frame ", () => {
    let startDate = getDate();
    let endDate = getDate(2);
    createTimeFrame(startDate, endDate);
  });

  it("check create time frame with an overlapping dates", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);
    cy.get("[data-cy=new_timeframe]").should("be.visible").click();
    let startDate = getDate();
    let endDate = getDate(2);
    cy.intercept("POST", `${Cypress.env("API")}/timeframes`).as(
      "createTimeFrameOne"
    );
    cy.typeTimeFrame(startDate, endDate);
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createTimeFrameOne").its("response.statusCode").should("eq", 200);

    /// second time frame
    cy.get("[data-cy=new_timeframe]").should("be.visible").click();
    startDate = getDate(1);
    endDate = getDate(2);
    cy.intercept("POST", `${Cypress.env("API")}/timeframes`).as(
      "createTimeFrameTwo"
    );
    cy.typeTimeFrame(startDate, endDate);
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@createTimeFrameTwo")
      .its("response.statusCode")
      .should("not.eq", 200);
  });
});

describe("update time frame", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check update time functionality with no schedules generated", () => {
    let startDate = getDate();
    let endDate = getDate(2);
    createTimeFrame(startDate, endDate);
    cy.get("[data-cy=edit]").click({ force: true });

    cy.intercept("PUT", `${Cypress.env("API")}/timeframes/*`).as(
      "updateTimeFrame"
    );
    cy.typeTimeFrame(startDate, endDate);
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@updateTimeFrame").its("response.statusCode").should("eq", 200);
  });
  it("check update time functionality with generated schedules", () => {
    let startDate = getDate();
    let endDate = getDate(2);
    createTimeFrame(startDate, endDate);
    cy.get("[data-cy=timeframe]").should("have.length", 1).click()
    cy.get("[data-cy=generate-schedule]").should("be.visible").click()
    // cy.get("[data-cy=edit]").click({ force: true });

    // cy.intercept("PUT", `${Cypress.env("API")}/timeframes/*`).as(
    //   "updateTimeFrame"
    // );
    // cy.typeTimeFrame(startDate, endDate);
    // cy.get("[data-cy=submit-button]").click();
    // cy.wait("@updateTimeFrame").its("response.statusCode").should("eq", 200);
  });
});
