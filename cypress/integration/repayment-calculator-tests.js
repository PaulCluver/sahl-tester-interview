describe('Repayment Calculator Tests', () => {

  const termSelector = 'div[data-tabcontent=Repayment] [name^="termInYears"]';
  const income = 'div[data-tabcontent=Repayment] [name^="grossHouseholdMonthlyIncomeInRands"]';
  const purchasePrice = 'div[data-tabcontent=Repayment] [name^="purchasePriceInRands"]';
  const deposit = 'div[data-tabcontent=Repayment] [name^="depositAmountInRands"]';
  const calculateButton = '#repaymentCalcForm > .btn-container > #continue1';
  const validationMessage = 'div.toast-box p.toast-message';
  const homeLoanCalculation = '.active > .boxin-panels > .boxin-aside > .lightbox > :nth-child(1) > [data-calc="purcase price"] > .amt-value'
  const instalmentCalculation = '.active > .boxin-panels > .boxin-aside > .lightbox > :nth-child(1) > [data-calc="instalment"] > .amt-value'
  const totalFees = '.active > .boxin-panels > .boxin-aside > .lightbox > [data-extra="Total Once-off Fees"] > .ce-set > .ce-value'
  const interest = '.active > .boxin-panels > .boxin-aside > .lightbox > :nth-child(1) > [data-calc="ineterest"] > .amt-value'

  beforeEach(() => {
    cy.visit('/#repayment')
  })

  it('Should display the expected elements', () => {
    cy.contains('.content-headline h2', 'Repayment Calculator').should('be.visible')
    cy.get(income).should('be.visible');
    cy.get(purchasePrice).should('be.visible');
    cy.get(deposit).should('be.visible');
    cy.get(termSelector).should('be.visible');
  })

  it('Should return the expected validation message when calculating and no gross monthly household income is input', () => {
    cy.get(income).type(' ', { force: true });
    cy.get(purchasePrice).type('2500000', { force: true });
    cy.get(deposit).type('500000', { force: true });
    cy.get(termSelector).first().select("20", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(validationMessage).contains('Check required fields').should('be.visible')
  })

  it('Should return the expected validation message when calculating and an invalid gross monthly household income is input', () => {
    cy.get(income).type('-1', { force: true });
    cy.get(purchasePrice).type('2500000', { force: true });
    cy.get(deposit).type('500000', { force: true });
    cy.get(termSelector).first().select("20", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(validationMessage).contains('Total income is below the required minimum for salaried applicants.').should('be.visible')
  })

  it('Should return the expected validation message when calculating and no property purchase price is input', () => {
    cy.get(income).type('100000', { force: true });
    cy.get(purchasePrice).type(' ', { force: true });
    cy.get(deposit).type('500000', { force: true });
    cy.get(termSelector).first().select("20", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(validationMessage).contains('Check required fields').should('be.visible')
  })

  it('Should return the expected validation message when calculating and an invalid property purchase price is input', () => {
    cy.get(income).type('100000', { force: true });
    cy.get(purchasePrice).type('0', { force: true });
    cy.get(deposit).type('500000', { force: true });
    cy.get(termSelector).first().select("20", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(validationMessage).contains('A property purchase price is required for a New Purchase mortgage loan application.').should('be.visible')
  })

  it('Should return the expected validation message when calculating and the loan amount requested is below the minimum', () => {
    cy.get(income).type('100000', { force: true });
    cy.get(purchasePrice).type('-1', { force: true });
    cy.get(deposit).type('500000', { force: true });
    cy.get(termSelector).first().select("20", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(validationMessage).contains('The loan amount requested is below the product minimum').should('be.visible')
  })

  it('Should return the expected validation message when calculating and an invalid loan term is selected', () => {
    cy.get(income).type('100000', { force: true });
    cy.get(purchasePrice).type('1000000', { force: true });
    cy.get(deposit).type('500000', { force: true });
    cy.get(termSelector).first().select("-- select --", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(validationMessage).contains('Check required fields').should('be.visible')
  })

  it('Should return the expected calculation when calculating and valid inputs are provided', () => {
    cy.get(income).type('50000', { force: true });
    cy.get(purchasePrice).type('1250000', { force: true });
    cy.get(deposit).type('150000', { force: true });
    cy.get(termSelector).first().select("20", { force: true });
    cy.get(calculateButton).click({ force: true})
    cy.get(homeLoanCalculation).contains("R1 250 000.00")
    cy.get(instalmentCalculation).contains('R8 331.00');
    cy.get(totalFees).contains('R60 737.00');
    cy.get(interest).contains('6.7%');
  })

})
