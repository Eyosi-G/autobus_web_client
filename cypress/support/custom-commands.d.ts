declare namespace Cypress {
  interface Chainable<Subject> {
    typeCredentials(username: string, password: string): Chainable<any>;
    resetData(): Chainable<any>;
    adminLogin(): Chainable<any>;
    selectNavMenu(index: Number): Chainable<any>;
    typeEmployeeData(
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      gender: String,
      birthDate: String,
      image?: String,
      email?: String,
      phonenumber?: String
    ): Chainable<any>;
  }
}