describe('Moralis Admin Login', () => {

    it('should log in and perform actions without CAPTCHA', () => {
        cy.visit('https://admin.moralis.io/login');
        cy.get('label[for="admin-login-email"]').click();
        cy.get('input[data-testid="test-input-input"][id="admin-login-email"]').type('harunze@outlook.com');
        cy.get('label[for="admin-login-password"]').click();
        cy.get('input[data-testid="test-input-input"][id="admin-login-password"]').type('Petd1narka@');
        cy.get('button[data-testid="test-button"]').click();
    });


    it('should trigger validation messages on invalid login data', () => {
        // Visit the login page
        cy.visit('https://admin.moralis.io/login');

        // Click on the email label and blur the email field
        cy.get('label[for="admin-login-email"]').click();
        cy.get('input[data-testid="test-input-input"][id="admin-login-email"]').blur();

        // Click on the password label and blur the password field
        cy.get('label[for="admin-login-password"]').click();
        cy.get('input[data-testid="test-input-input"][id="admin-login-password"]').blur();

        // Assert that the validation messages are shown
        cy.get('input[data-testid="test-input-input"][id="admin-login-email"]').then(($input) => {
            cy.wrap($input).should('have.attr', 'required');
            cy.get('strong[data-testid="test-input-feedback"]').should('contain', 'Please fill out this field.');
        });

        cy.get('input[data-testid="test-input-input"][id="admin-login-password"]').then(($input) => {
            cy.wrap($input).should('have.attr', 'required');
            cy.get('strong[data-testid="test-input-feedback"]').should('contain', 'Please fill out this field.');
        });
    });

    it('should show error notification on invalid login credentials', () => {
        // Visit the login page
        cy.visit('https://admin.moralis.io/login');

        // Enter invalid email and password after focusing on the labels
        cy.get('label[for="admin-login-email"]').click();
        cy.get('input[data-testid="test-input-input"][id="admin-login-email"]').type('invalid@nonexistent.com');

        cy.get('label[for="admin-login-password"]').click();
        cy.get('input[data-testid="test-input-input"][id="admin-login-password"]').type('wrongpassword');

        // Click the login button
        cy.get('button[data-testid="test-button"]').click();

        cy.wait(5000);
        cy.confirmCaptcha();
        // Assert that the error notification is shown
        cy.get('div[data-testid="test-notification"]').should('be.visible');
        cy.get('div[data-testid="test-notification"]').should('contain', 'Something went wrong!');
        cy.get('span[data-testid="test-notification-message"]').should('contain', 'Unauthorized');
    });
});