import RegisterPage from "../OpenCartPageObjects/RegisterPage";

describe('User Registration', () => {

    it('Successfully create an account with valid first name, last name, email, password, and matching confirm password.', () => {
        RegisterPage.Register();
        RegisterPage.fillRegistrationForm({
            firstname: 'test',
            lastname: '003',
            email: 'test004@gmail.com',
            password: '1234',
            acceptPrivacyPolicy: true
        });
        RegisterPage.completeRegister();

        cy.get('div[id="content"]>h1')
            .should('be.visible')
            .and('have.text', 'Your Account Has Been Created!');
    });

    it('Try to submit the registration form without accepting the terms and conditions and verify the error message.', () => {
        RegisterPage.Register();
        RegisterPage.fillRegistrationForm({
            firstname: 'test',
            lastname: '003',
            email: 'test004@gmail.com',
            password: '1234',
        });
        RegisterPage.completeRegister();

        cy.contains('.alert-danger', 'Warning: You must agree to the Privacy Policy!')
            .should('be.visible');
    });

    it('Try to register with an empty field and verify that the system shows a required field error.', () => {
        RegisterPage.Register();
        RegisterPage.completeRegister();

        cy.get('#error-firstname').should('be.visible').and('have.text', 'First Name must be between 1 and 32 characters!');
        cy.get('#error-lastname').should('be.visible').and('have.text', 'Last Name must be between 1 and 32 characters!');
        cy.get('#error-email').should('be.visible').and('have.text', 'E-Mail Address does not appear to be valid!');
        cy.get('#error-password').should('be.visible').and('have.text', 'Password must be between 4 and 20 characters!');
        cy.contains('.alert-danger', 'Warning: You must agree to the Privacy Policy!').should('be.visible');
    });

    it('Verify that the system allows registration with a password at the maximum allowed length (e.g., 50 characters).', () => {
        RegisterPage.Register();

        const pass = 'a'.repeat(50);
        RegisterPage.fillRegistrationForm({
            firstname: 'test',
            lastname: '005',
            email: 'test005@gmail.com',
            password: pass,
            acceptPrivacyPolicy: true
        });
        RegisterPage.completeRegister();

        cy.get('#error-password').should('be.visible').and('have.text', 'Password must be between 4 and 20 characters!');
    });

    it('Attempt registration using an email address with special characters', () => {
        RegisterPage.Register();
        RegisterPage.fillRegistrationForm({
            firstname: 'hello',
            lastname: 'worlds',
            email: 'hello+worlds@gmail.com',
            password: '1234',
            acceptPrivacyPolicy: true
        });
        RegisterPage.completeRegister();

        cy.get('div[id="content"]>h1')
            .should('be.visible')
            .and('have.text', 'Your Account Has Been Created!');
    });

    it('Verify that registration fails when the password is less than the minimum required length.', () => {
        RegisterPage.Register();
        RegisterPage.fillRegistrationForm({
            firstname: 'hello',
            lastname: 'worlds',
            email: 'hello+worlds@gmail.com',
            password: '123',
            acceptPrivacyPolicy: true
        });
        RegisterPage.completeRegister();

        cy.get('#error-password').should('be.visible').and('have.text', 'Password must be between 4 and 20 characters!');
    });
});
