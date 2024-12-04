import UserManagement from "../OpenCartPageObjects/UserManagement";
describe('User Management', () => {

    beforeEach(() => {
        UserManagement.visit();
    });
    // Positive
    it('Enabling users to view and edit their personal information like name, email, address, etc.', () => {
        UserManagement.editDetails('Testing','User');
        UserManagement.submitButton();
        cy.get('.alert').should('be.visible').and('have.text',' Success: Your account has been successfully updated.')
    });

    it('Allowing users to log in and log out of their accounts securely.', () => {
        cy.get('.list-group > [href="https://demo.opencart.com/en-gb?route=account/logout"]').click();
        cy.get('h1').should('be.visible').and('have.text', 'Account Logout');
    });
    it('Allowing users to change their password', () => {
        cy.get('#content > :nth-child(2) > :nth-child(2) > a').click();
        cy.get('#input-password').clear().type('1234');
        cy.get('#input-confirm').clear().type('1234');
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('be.visible').and('have.text', ' Success: Your password has been successfully updated.')
    });

    // Negative
    it('Ensure that the system prevents the user from updating their email address to an already registered email.', () => {
        cy.get('#content > :nth-child(2) > :nth-child(1) > a').click();
        cy.get('#input-email').clear().type('test004@gmail.com');
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('be.visible').and('have.text', ' Success: Your account has been successfully updated.');
    });
    it('Ensure that the while changing the Password both the password field contain same password', () => {
        cy.get('#content > :nth-child(2) > :nth-child(2) > a').click();
        cy.get('#input-password').clear().type('1234');
        cy.get('#input-confirm').clear().type('123');
        cy.get('.text-end > .btn').click();
        cy.get('#error-confirm').should('be.visible').and('have.text', 'Password confirmation does not match password!')
    });

    // edge
    it('Verify that the system accepts special characters in certain profile fields (e.g., address or name with an apostrophe like "O"Neil)', () => {
        cy.get('#content > :nth-child(2) > :nth-child(1) > a').click();
        cy.get('#input-firstname').clear().type("O'Neil");
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('be.visible').and('have.text', ' Success: Your account has been successfully updated.');
    });
    it('Attempt to update the profile information with empty optional fields and ensure it saves successfully without errors.', () => {
        cy.get('#content > :nth-child(2) > :nth-child(3) > a').click();
        cy.get('.row > .text-end > .btn').click();
        UserManagement.enterAddress('Rajneesh', 'Kumar', 'Saket', 'Hauz Khas', '248001');
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('be.visible').and('have.text', ' Your address has been successfully added')
    });

    it('Verify that all the saved addresses should be deleted but at least one address must remain.', () => {

        cy.get('#content > :nth-child(2) > :nth-child(3) > a').click();
        
        cy.get('.table-responsive>table>tbody>tr').then(($rows) => {
            const addressCount = $rows.length;
    
            if (addressCount > 1) {
                cy.get('.table-responsive>table>tbody>tr:first-child>td:last-child>a:last-child').click();
                cy.get('.table-responsive>table>tbody>tr').should('have.length', addressCount - 1);
            } else if (addressCount === 1) {
                cy.get('.table-responsive>table>tbody>tr:first-child>td:last-child>a:last-child').click();
                cy.get('.alert').should('be.visible').and('have.text', ' Warning: You must have at least one address! ');
                cy.get('.table-responsive>table>tbody>tr').should('have.length', 1);
            }
     });
    });

    it('Ensure that the system prevents saving the profile if the name exceeds the character limit by one character', () => {
        cy.get('#content > :nth-child(2) > :nth-child(1) > a').click();
        const name = 'a'.repeat(33);
        cy.get('#input-firstname').clear().type(name);
        cy.get('#input-lastname').clear().type(name);
        cy.get('.text-end > .btn').click();
        cy.get('#error-firstname').should('be.visible').and('have.text', 'First Name must be between 1 and 32 characters!');
        cy.get('#error-lastname').should('be.visible').and('have.text', 'Last Name must be between 1 and 32 characters!');
    });
});