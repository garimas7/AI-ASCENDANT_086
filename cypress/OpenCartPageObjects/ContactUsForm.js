class ContactUsForm{
    visit(){
        cy.visit('https://demo.opencart.com/');
    }
    login(){
        cy.get(':nth-child(2) > .dropdown').click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(2) > .dropdown-item').click();
        cy.wait(2000);
        cy.get('#input-email').clear().type('rk@gmail.com');
        cy.get('#input-password').clear().type('1234');
        cy.get('#form-login > .text-end > .btn').click();
        cy.wait(2000);
    }

    contactForm(){
        cy.get(':nth-child(2) > .list-unstyled > :nth-child(1) > a').click();
        cy.wait(2000);
    }
}

export default new ContactUsForm();