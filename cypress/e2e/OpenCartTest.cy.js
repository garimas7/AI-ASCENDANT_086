import './LoginPage.cy'
import './RegisterPage.cy'
import './UserManagement.cy'

describe('OpenCart Tests', () => {
    it('should load the OpenCart page', () => {
        cy.visit('https://demo.opencart.com/');
        cy.title().should('include', 'Your Store');
    });
});