class RegisterPage {
    Register() {
        cy.visit('https://demo.opencart.com/en-gb?route=account/register', { failOnStatusCode: false });
    }

    fillRegistrationForm({ firstname, lastname, email, password, acceptPrivacyPolicy = false }) {
        if (firstname) cy.get('#input-firstname').type(firstname);
        if (lastname) cy.get('#input-lastname').type(lastname);
        if (email) cy.get('#input-email').type(email);
        if (password) cy.get('#input-password').type(password);
        if (acceptPrivacyPolicy) cy.get('input[name="agree"]').check();
    }

    completeRegister() {
        cy.get('button[type="submit"]').click();
    }
}

export default new RegisterPage();
