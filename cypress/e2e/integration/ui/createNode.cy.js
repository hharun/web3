describe('Node Creation', () => {
    beforeEach(() => {
        cy.login('harunze@outlook.com', 'Moralisweb3Test');
        // Disable CAPTCHA for the duration of the test
        cy.intercept('POST', '/your/captcha/endpoint', (req) => {
          req.reply({ captchaPassed: true });
        });
      });
  
    it('should navigate to Nodes and create a new Node', () => {
     // Click on the "Nodes" button
     cy.get('button[title="Nodes"]').click();

     // Click the "Create a New Node" button
     cy.get('button[data-testid="mui-button-primary"]').contains('Create a New Node').click();
     
    // Select a random protocol from the dropdown
    cy.get('select[data-testid="test-CardCountrySelect"]').then($select => {
        const options = $select.find('option');
        const randomIndex = Math.floor(Math.random() * options.length);
        cy.wrap($select).select(options[randomIndex].value);
      });

    // Select a random network from the second dropdown
    cy.get('select[id="select-network"]').then($select => {
        const options = $select.find('option').not(':disabled'); // exclude disabled option
        const randomIndex = Math.floor(Math.random() * options.length);
        cy.wrap($select).select(options[randomIndex].value);
      });
      
    // Click the "Create Node" button
    cy.get('button[data-testid="mui-button-primary"]').contains('Create Node').click();
    });
  });