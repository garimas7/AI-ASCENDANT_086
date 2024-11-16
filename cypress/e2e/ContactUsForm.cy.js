import ContactUsForm from "../OpenCartPageObjects/ContactUsForm";

describe('Contact Us Form', () => {
    it('Verify that the form can be submitted after enter valid details', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-enquiry').clear().type('Hello World!');
        cy.get('.text-end > .btn').click();
        cy.wait(2000);
        cy.get('#content > p').should('be.visible').and('have.text','Your enquiry has been successfully sent to the store owner!');
    });
    it('Verify that the form contains a valid address and name number if the user has logged in.', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-name').should('be.visible').and('have.value', 'aaaa');
        cy.get('#input-email').should('be.visible').and('have.value', 'rk@gmail.com');
    });
    it('Verify that the form cannot be submitted if required fields (e.g., name, email, message) are empty.', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-name').clear();
        cy.get('#input-email').clear();
        cy.get('.text-end > .btn').click();
        cy.get('#error-name').should('be.visible').and('have.text','Name must be between 3 and 32 characters!');
        cy.get('#error-email').should('be.visible').and('have.text','E-Mail Address does not appear to be valid!');
        cy.get('#error-enquiry').should('be.visible').and('have.text','Enquiry must be between 10 and 3000 characters!');
        cy.wait(2000);
    });
    it('Verify that the form does not allow submission if the name is less than 3 characters (e.g., missing a symbol).', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-enquiry').clear().type('Hello World!');
        cy.get('.text-end > .btn').click();
        cy.get('#error-name').should('be.visible').and('have.text','Name must be between 3 and 32 characters!');
    });
    it('Verify that the system accepts a message that is at the maximum allowed length.', () => {

        const message = 'a'.repeat(3000);
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-enquiry').clear().type(message);
        cy.get('.text-end > .btn').click();
        cy.get('#content > p').should('be.visible').and('have.text','Your enquiry has been successfully sent to the store owner!');
    });
    it('Verify that the system allows the submission of an inquiry with only the required fields (name and email) filled, leaving the message empty.', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('.text-end > .btn').click();
        cy.get('#error-enquiry').should('be.visible').and('have.text','Enquiry must be between 10 and 3000 characters!');
    });
    it('Verify that the name field accepts the maximum number of characters allowed.', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-name').clear().type('a'.repeat(50));
        cy.get('#input-enquiry').clear().type('Hello World!');
        cy.get('.text-end > .btn').click();
        cy.get('#error-name').should('be.visible').and('have.text','Name must be between 3 and 32 characters!');
    });
    it('Verify that the system accepts a message with the minimum allowed length (e.g., 1 character).', () => {
        ContactUsForm.visit();
        ContactUsForm.login();
        ContactUsForm.contactForm();
        cy.get('#input-enquiry').clear().type('H');
        cy.get('.text-end > .btn').click();
        cy.get('#error-enquiry').should('be.visible').and('have.text','Enquiry must be between 10 and 3000 characters!');
    });
});