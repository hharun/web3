describe('Moralis Admin Login', () => {
    it('should log in with valid credentials', () => {
    // Visit the login page
    cy.visit('https://admin.moralis.io/login');

    // Click on the email label to ensure the input is focused
    cy.get('label[for="admin-login-email"]').click();
    // Enter email
    cy.get('input[data-testid="test-input-input"][id="admin-login-email"]').type('harunze@outlook.com');

    // Click on the password label to ensure the input is focused
    cy.get('label[for="admin-login-password"]').click();
    // Enter password
    cy.get('input[data-testid="test-input-input"][id="admin-login-password"]').type('Petd1narka@');

    // Click the login button
    cy.get('button[data-testid="test-button"]').click();

  
      cy.url().should('include', '/admin.moralis.io/'); 
    });
  });