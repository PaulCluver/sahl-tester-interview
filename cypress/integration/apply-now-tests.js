describe('Apply Now Tests', () => {

  const contentContainer = 'div.content-container';
  const initialQuestionsContinueButton = '.active > .holder-8 > :nth-child(3) > #continue3';
  const validationMessage = 'div.toast-box p.toast-message';
  const applicantIDNumber = '7601015800087';
  const idNumber  = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][identityNumber]"]';
  const salutation  = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][salutationId]"]';
  const firstName = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][firstName]"]';
  const surName = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][surname]"]';
  const maritalStatus = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][maritalStatusId]"]';
  const emailSelector = '[id^="email-"]';
  const cellNumberSelector = '[id^="tel-"]';
  const streeetNumberName = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][addresses][0][freeText2]"]';
  const suburb = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][addresses][0][freeText3]"]';
  const province = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][addresses][0][provinceId]"]';
  const city = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][addresses][0][freeText4]"]';
  const postalCode = 'div[data-tabcontent="Personal Information"] [name^="postalCode"]';
  const incomeType = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][employment][employmentTypeId]"]'
  const householdIncome = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][employment][monthlyIndividualIncomeAmountInRands]"]'
  const incomeContrib = 'div[data-tabcontent="Personal Information"] [name^="applicants[0][employment][applicationIncomeContributor]"]'
  const consentSharePersonalDetails = 'div[data-tabcontent="Personal Information"] [name^="sharePersonalDetails"]'
  const allowITC = 'div[data-tabcontent="Personal Information"] [name^="declarationQuestionId_2"]'
  const isGEPF = 'div[data-tabcontent="Personal Information"] [name^="declarationQuestionId_3"]';
  const personalDetailsContinueButton = '#continue3';

  beforeEach(() => {
    cy.visit('/apply/requirements/new-purchase');
    cy.get(contentContainer).contains('Start Application').click({ force: true});
  });

  it('Should not allow you to continue without answering the expected questions', () => {
    cy.get(initialQuestionsContinueButton).click();
    cy.get(validationMessage).contains('Check required fields').should('be.visible')
  });

  it('should navigate to the personal information page when completing the initial questions', () => {
    cy.completeInitialQuestions(1,3,4,6,8);
    cy.get(initialQuestionsContinueButton).click();
    cy.contains('.content-headline h2', 'Tell us more about yourself').should('be.visible')
  });

  it('should display a warning message when the email addresses do not match', () => {
    cy.completeInitialQuestions(1,3,4,6,8);
    cy.get(initialQuestionsContinueButton).click();
    cy.get(emailSelector).eq(0).type("paulcl@sahomeloans.com");
    cy.get(emailSelector).eq(1).type("paulocl@sahomeloans.com");
    cy.get('div[data-tabcontent="Personal Information"]').contains("Email addresses don't match").should('be.visible');
  });

  it('should navigate to the loan information page when completing the personal information details', () => {
    cy.completeInitialQuestions(1,3,4,6,8);
    cy.get(initialQuestionsContinueButton).click();
    cy.get(idNumber).type(applicantIDNumber, { force: true });
    cy.get(salutation).first().select("Mr", { force: true });
    cy.get(firstName).type("Paul", { force: true});
    cy.get(surName).type("Cluver", { force: true});
    cy.get(maritalStatus).first().select("Single", { force: true });
    cy.get(emailSelector).eq(0).type("paulcl@sahomeloans.com");
    cy.get(emailSelector).eq(1).type("paulcl@sahomeloans.com");
    cy.get(cellNumberSelector).eq(0).type("0827498290", {force: true});
    cy.get(cellNumberSelector).eq(1).type("0827498290", {force: true});
    cy.get(streeetNumberName).type("121 Green Street", {force: true});
    cy.get(suburb).type("Westville", {force: true});
    cy.get(province).first().select("Kwazulu-natal", { force: true });
    cy.get(city).type("Durban", {force: true});
    cy.get(postalCode).type("3629");
    cy.get(incomeType).first().select("Salaried", { force: true });
    cy.get(householdIncome).type("50000", { force: true});
    cy.get(incomeContrib).click();
    cy.get(consentSharePersonalDetails).click();
    cy.get(allowITC).click();
    cy.get(isGEPF).eq(1).click( { force: true});
    cy.get(personalDetailsContinueButton).click({force:true});
    cy.contains('.content-headline h2', 'Tell us what you need').should('be.visible')
  });

})
