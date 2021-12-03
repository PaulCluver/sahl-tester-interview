describe('Repayment Calculator Tests', () => {
  beforeEach(() => {
    cy.visit('/#repayment')
  })
  it('Should display the Repayment Calculator heading', () => {
    cy.contains('.content-headline h2', 'Repayment Calculator')
      .should('be.visible')
  })
  it('Should return the expected validation message when calculating and an invalid gross monthly household income is input', () => {
    cy.get('div[data-tabcontent=Repayment] input[name=grossHouseholdMonthlyIncomeInRands]')
      .should('be.visible')
      .type('1', { force: true });
    cy.get('div[data-tabcontent=Repayment] input[name=purchasePriceInRands]')
      .should('be.visible')
      .type('1000000', { force: true });
    cy.get('div[data-tabcontent=Refinance]')
      .find('[id^=continue1]')
      .click({ force: true})
    cy.get('div.toast-box p.toast-message')
      .contains('The estimated market value of the property must be greater than zero.')
      .should('be.visible')
  })
  it('Should return the expected validation message when calculating and an invalid property purchase price is input', () => {
    cy.get('div[data-tabcontent=Repayment] input[name=grossHouseholdMonthlyIncomeInRands]')
      .should('be.visible')
      .type('50000', { force: true });
    cy.get('div[data-tabcontent=Repayment] input[name=purchasePriceInRands]')
      .should('be.visible')
      .type('1', { force: true });
    cy.get('div[data-tabcontent=Refinance]')
      .find('[id^=continue1]')
      .click({ force: true})
    cy.get('div.toast-box p.toast-message')
      .should('be.visible')
      .contains('The estimated market value of the property must be greater than zero.')
      .should('be.visible')
  })
})
