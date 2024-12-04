import LoginPage from "../OpenCartPageObjects/LoginPage";

// Test data
const testData = {
    validEmail: 'test002@gmail.com',
    validPassword: '1234',
    invalidEmail: 'test002gmail.com',
    shortPassword: '123',
    longPassword: 'a'.repeat(50),
    validFirstName: 'John',
    invalidFirstName: 'a'.repeat(50),
    validLastName: 'Doe',
    invalidLastName: 'b'.repeat(50),
};

// Error messages
const errorMessages = {
    passwordLength: 'Password must be between 4 and 20 characters!',
    nameLength: 'First Name must be between 1 and 32 characters!',
    invalidLogin: ' Warning: No match for E-Mail Address and/or Password. ',
};

describe('Login and Authentication', () => {

    beforeEach(() => {
        LoginPage.visit();
    });

    // Positive Test Cases
    it('Verify successful login with valid email and password', () => {
        LoginPage.fillLoginCredentials(testData.validEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        cy.get('#content > :nth-child(1)').should('be.visible').and('have.text', 'My Account');
    });

    it('Ensure user is redirected to the dashboard after successful login', () => {
        LoginPage.fillLoginCredentials(testData.validEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        cy.url().should('include', 'route=account/account');
    });

    // Negative Test Cases
    it('Try to login with missing required fields and check for validation errors', () => {
        LoginPage.clickLoginButton();
        cy.get('.alert').should('have.text', errorMessages.invalidLogin);
    });

    it('Try to login with an invalid email format and verify the error', () => {
        LoginPage.fillLoginCredentials(testData.invalidEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        cy.get('.alert').should('have.text', errorMessages.invalidLogin);
    });

    // Edge Cases
    it('Verify that updating an email to an invalid format is rejected', () => {
        LoginPage.fillLoginCredentials(testData.validEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        LoginPage.updateFirstName('invalidEmailFormat');
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('contain', 'Invalid email format'); // Update as per actual error message
    });

    it('Ensure password field accepts only 4-20 characters', () => {
        LoginPage.fillLoginCredentials(testData.validEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        LoginPage.validatePasswordLength(testData.longPassword);
    });

    it('Validate that First Name and Last Name allow exactly 1-32 characters and reject any additional characters', () => {
        LoginPage.fillLoginCredentials(testData.validEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        LoginPage.validateFieldErrors(testData.invalidFirstName, testData.invalidLastName);
    });

    // Boundary Conditions
    it('Ensure user cannot reset password immediately after login without proper data', () => {
        LoginPage.fillLoginCredentials(testData.validEmail, testData.validPassword);
        LoginPage.clickLoginButton();
        const newPassword = '12345';
        cy.get('#content > :nth-child(2) > :nth-child(2) > a').click();
        cy.get('#input-password').type(newPassword);
        cy.get('#input-confirm').type(newPassword);
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('contain', 'Your password has been successfully updated.'); // Update as per actual message
    });
});
