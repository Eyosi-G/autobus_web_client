/// <reference types="cypress" />
// @ts-check

function getDate(after = 0) {
  const now = new Date();
  now.setDate(now.getDate() + after);
  return now.toISOString().split("T")[0];
}

function populateEmployees() {
  cy.fixture("employees.json").then((employee) => {
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const token = state.login.data.token;
        cy.request({
          method: "POST",
          body: JSON.stringify(employee[0]),
          url: `${Cypress.env("API")}/drivers`,
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        });
        cy.request({
          method: "POST",
          body: JSON.stringify(employee[1]),
          url: `${Cypress.env("API")}/ticketers`,
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        });
        cy.request({
          method: "POST",
          body: JSON.stringify(employee[2]),
          url: `${Cypress.env("API")}/ticketers`,
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        });
        cy.request({
          method: "POST",
          body: JSON.stringify(employee[3]),
          url: `${Cypress.env("API")}/drivers`,
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        });
      });
  });
}

function populateStat() {
  cy.fixture("bus_stats.csv").then((data) => {
    const blob = Cypress.Blob.binaryStringToBlob(data);
    const formData = new FormData();
    formData.set("file", blob, "bus_stats.csv");
    cy.request({
      method: "POST",
      url: `${Cypress.env("API")}/stats/upload`,
      body: formData,
    });
  });
}

function createTimeFrame(startDate, endDate) {
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
    cy.adminLogin();
    cy.selectNavMenu(4);
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
    cy.adminLogin();
    cy.selectNavMenu(4);
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
    cy.adminLogin();
    cy.selectNavMenu(4);
    createTimeFrame(startDate, endDate);
    cy.then(() => {
      populateEmployees();
      populateStat();
    });

    // generate schedule
    cy.get("[data-cy=timeframe]").should("have.length", 1).click();
    cy.get("[data-cy=generate-schedule]").should("be.visible").click();
    cy.get("[data-cy=back_button]").click();
    cy.get("[data-cy=edit]").click({ force: true });

    cy.intercept("PUT", `${Cypress.env("API")}/timeframes/*`).as(
      "updateTimeFrame"
    );
    endDate = getDate(3);
    cy.typeTimeFrame(startDate, endDate);
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@updateTimeFrame")
      .its("response.statusCode")
      .should("not.eq", 200);
  });

  it("check update time frame with an overlapping dates", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);

    let startDateOne = getDate();
    let endDateOne = getDate(3);

    let startDateTwo = getDate(4);
    let endDateTwo = getDate(5);

    createTimeFrame(startDateOne, endDateOne);
    createTimeFrame(startDateTwo, endDateTwo);
    cy.get("[data-cy=edit]").last().click({ force: true });
    cy.intercept("PUT", `${Cypress.env("API")}/timeframes/*`).as(
      "updateTimeFrame"
    );
    startDateTwo = getDate(2);
    cy.typeTimeFrame(startDateTwo, endDateTwo);
    cy.get("[data-cy=submit-button]").click();
    cy.wait("@updateTimeFrame")
      .its("response.statusCode")
      .should("not.eq", 200);
  });
});

describe("delete time frame", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check delete time frame functionality", () => {
    cy.adminLogin();
    cy.selectNavMenu(4);
    let startDate = getDate();
    let endDate = getDate(3);
    createTimeFrame(startDate, endDate);
    cy.get("[data-cy=delete-timeframe]").click({ force: true });
    cy.intercept("DELETE", `${Cypress.env("API")}/timeframes/*`).as(
      "deleteTimeFrame"
    );
    cy.get("[data-cy=confirm-delete]").click();
    cy.wait("@deleteTimeFrame").its("response.statusCode").should("eq", 200);
  });
});

describe("generate schedule", () => {
  beforeEach(() => {
    cy.resetData();
  });
  it("check generate schedule functionality", () => {
    let startDate = getDate();
    let endDate = getDate(2);
    cy.adminLogin();
    cy.selectNavMenu(4);
    createTimeFrame(startDate, endDate);
    cy.then(() => {
      populateEmployees();
      populateStat();
    });

    cy.get("[data-cy=timeframe]").should("have.length", 1).click();
    cy.get("[data-cy=generate-schedule]").should("be.visible").click();
  });
});
