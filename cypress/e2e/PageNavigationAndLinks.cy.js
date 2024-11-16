import PageNavigationAndLinks from '../OpenCartPageObjects/PageNavigationAndLinks';

describe('Page Navigation and Links', () => {
    beforeEach(() => {
        PageNavigationAndLinks.visitHomePage();
    });

    it('Verify that clicking on each navigation menu item redirects to the correct page.', () => {
        PageNavigationAndLinks.navigation();
        cy.get('.breadcrumb > :nth-child(1)').click();  // Homepage
        cy.get('h3').should('be.visible').and('have.text','Featured')
        cy.wait(2000);
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();   // Product Page
        cy.get('h1').should('be.visible').and('have.text','MacBook')
        cy.wait(2000);
        cy.get('.row > :nth-child(1) > .list-unstyled > :nth-child(3) > a').click();    // About Us Page
        cy.get('h1').should('be.visible').and('have.text','About Us')
        cy.wait(2000);
    });

    it('Verify that Button over Desktop shows sub-options and allows navigation to correct pages.', () => {
        PageNavigationAndLinks.accountDropdown();
        cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item').click();  // Register Page
        cy.get('h1').should('be.visible').and('have.text','Register Account')
        cy.wait(2000);

        PageNavigationAndLinks.accountDropdown();
        cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(2) > .dropdown-item').click();  // Login Page
        cy.get('#form-login > h2').should('be.visible').and('have.text','Returning Customer')
        cy.wait(2000);
    });

    it('Verify that footer links navigate to the correct pages when clicked.', () => {
        PageNavigationAndLinks.navigation();
        cy.get('.row > :nth-child(1) > .list-unstyled > :nth-child(4) > a').click();
        cy.get('h1').should('be.visible').and('have.text','Privacy Policy')
        cy.wait(2000);

        cy.get('.row > :nth-child(1) > .list-unstyled > :nth-child(1) > a').click();
        cy.get('h1').should('be.visible').and('have.text','Terms & Conditions')
        cy.wait(2000);

    });

    it('Verify that clicking a disabled button does not trigger any action', () => {
        cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(2) > .dropdown-item').click({force: true});  // Login Page
        cy.get('#form-login > h2').should('be.visible').and('have.text','Returning Customer')
        cy.wait(2000);
        cy.get('#input-email').type('dummyuser1@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('#form-login > .text-end > .btn').click();
        cy.wait(2000);  
        cy.get('.list-inline > :nth-child(5)').click();
        cy.wait(2000);  
        cy.get('.text-end>button[type="button"]').contains('Confirm Order').should('be.disabled');
        cy.get('.text-end>button[type="button"]').click({force: true});
        cy.wait(2000);
        cy.url().should('not.include', '/next-page');
        cy.get('.form-success-message').should('not.exist');
    });
    
});
