// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('completeInitialQuestions', (applyingWithCoApplicant, underDebtCounselling, between18and60, haveTitleDeed, aboutToSignOffer) => {
  const featuresSelector = '[id^="radio-"]';
  cy.get(featuresSelector).eq(applyingWithCoApplicant).click();
  cy.get(featuresSelector).eq(underDebtCounselling).click();
  cy.get(featuresSelector).eq(between18and60).click();
  cy.get(featuresSelector).eq(haveTitleDeed).click();
  cy.get(featuresSelector).eq(aboutToSignOffer).click();
});
