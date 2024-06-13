Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://admin.moralis.io/login');
    cy.intercept('POST', 'https://www.google.com/recaptcha/api2/**', {
        statusCode: 200,
        body: { success: true },
      }).as('recaptcha');

    cy.get('label[for="admin-login-email"]').click();
    cy.get('input[data-testid="test-input-input"][id="admin-login-email"]').type(email);
    cy.get('label[for="admin-login-password"]').click();
    cy.get('input[data-testid="test-input-input"][id="admin-login-password"]').type(password);
    cy.get('button[data-testid="test-button"]').click();

    cy.wait('@recaptcha');
  });
