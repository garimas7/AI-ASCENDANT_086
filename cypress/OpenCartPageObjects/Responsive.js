class Responsive {
  
    visit(){
        cy.visit('https://demo.opencart.com/');
    }
    verifyLayoutOnMobile() {
      cy.viewport('iphone-6');
      cy.get('body').should('be.visible');
    }
  
    verifyNavigationMenuOnMobile() {
      cy.viewport('iphone-6');
      cy.get('.navbar-toggler').click();
      cy.wait(2000);
      cy.get('.navbar-nav').should('be.visible');
      cy.get('.navbar-nav').contains('Software').click();
      cy.wait(2000);
      cy.url().should('include', 'catalog/software');
    }

    verifyInteractiveElements() {
      cy.viewport('iphone-6');
      cy.get('button').contains('item').click();
      cy.get('a').contains('About Us').click();
      cy.wait(2000);
      cy.url().should('include', 'cart');
    }
  
    verifyNoContentOverflow() {
      cy.viewport('iphone-6');
      cy.get('body').should('not.have.css', 'overflow', 'hidden');
      cy.get('html').should('have.css', 'width', '358.3999938964844px');
    }
  
    verifyButtonAndLinkTapping() {
      cy.viewport('iphone-6');
      cy.get('button').contains('item').click();
      cy.wait(2000);
      cy.get('a').contains('About Us').click();
      cy.wait(2000);  
    }

    verifyJavaScriptFunctions() {
      cy.viewport('iphone-6');
      cy.get('input[name="search"]').type('macbook');
      cy.get('button').contains('item').click();
      cy.wait(2000);
      cy.url().should('include', 'https://demo.opencart.com/');
    }
  
    verifyOnSmallMobileScreen() {
      cy.viewport(320, 480);
      cy.get('body').should('be.visible');
    }
  
    verifyOrientation() {
      cy.viewport('iphone-6');
      cy.get('body').should('be.visible');
      
      cy.viewport('iphone-6+', 'landscape');
      cy.get('body').should('be.visible');
    }
  
    verifyNoContentCutOff() {
      cy.viewport('iphone-6');
      cy.get('img').should('be.visible');
      cy.get('h3').should('be.visible');
    }
  
    verifyClickableElementsAccessibility() {
      cy.viewport(320, 480);
      cy.get('button').contains('item').should('be.visible').click();
      cy.wait(2000);
      cy.get('a').contains('About Us').should('be.visible').click();
      cy.wait(2000);
      cy.get(':nth-child(2) > .dropdown > .dropdown-toggle').click();
      cy.wait(2000);
      cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(2) > .dropdown-item').click();
      cy.wait(2000);
      cy.get('form').contains('Login').should('be.visible');
      cy.wait(2000);
    }
  }
  
  export default new Responsive();
  