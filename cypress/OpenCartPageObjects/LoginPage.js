class LoginPage {
    visit() {
        cy.visit('https://demo.opencart.com/en-gb?route=account/login', { failOnStatusCode: false });
    }

    fillLoginCredentials(email, password) {
        cy.get('#input-email').type(email);
        cy.get('#input-password').type(password);
    }

    clickLoginButton() {
        cy.get('#form-login > .text-end > .btn').click();
    }

    navigateToAccountSettings() {
        cy.get('#content > :nth-child(2) > :nth-child(1) > a').should('be.visible').click();
    }

    updateFirstName(firstname) {
        this.navigateToAccountSettings();
        cy.get('#input-firstname').clear().type(firstname);
    }

    validateFieldErrors(firstName, lastName) {
        this.navigateToAccountSettings();
        cy.get('#input-firstname').clear().type(firstName);
        cy.get('#input-lastname').clear().type(lastName);
        cy.get('.text-end > .btn').click();
        cy.get('#error-firstname').should('have.text', errorMessages.nameLength);
        cy.get('#error-lastname').should('have.text', errorMessages.nameLength);
    }

    validatePasswordLength(password) {
        cy.get('#content > :nth-child(2) > :nth-child(2) > a').click();
        cy.get('#input-password').clear().type(password);
        cy.get('#input-confirm').clear().type(password);
        cy.get('.text-end > .btn').click();
        cy.get('#error-password').should('have.text', errorMessages.passwordLength);
    }
}

export default new LoginPage();
