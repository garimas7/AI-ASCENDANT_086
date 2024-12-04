class NewsletterSubscription{
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
    register(){
        cy.get(':nth-child(2) > .dropdown').click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item').click();
        cy.wait(2000);
        cy.get('#input-firstname').type('a');
        cy.get('#input-lastname').type('b');
        cy.get('#input-email').type('rk@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('#input-newsletter').check();
        cy.get('.text-end > .form-check > .form-check-input').check();
        cy.get('.text-end > .btn').click();
        cy.wait(2000);

    }
    newsletterSubs(){
        cy.get(':nth-child(8) > li > a').click();
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('be.visible').and('have.text', ' Success: Your newsletter subscription has been successfully updated!')
        cy.wait(2000);
    }
    newsletterUnSubs(){
        cy.get(':nth-child(8) > li > a').click();
        cy.get('#input-newsletter').uncheck();
        cy.get('.text-end > .btn').click();
        cy.get('.alert').should('be.visible').and('have.text', ' Success: Your newsletter subscription has been successfully updated!')
        cy.wait(2000);
    }
}

export default new NewsletterSubscription();