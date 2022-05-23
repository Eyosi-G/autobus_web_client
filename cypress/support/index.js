// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-file-upload";

// Alternatively you can use CommonJS syntax:
// require('./commands')

function getDate(after = 0) {
  const now = new Date();
  now.setDate(now.getDate() + after);
  return now.toISOString().split("T")[0];
}
