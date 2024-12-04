class UserManagement{
    visit(){
        cy.visit('https://demo.opencart.com/en-gb?route=account/login', {failOnStatusCode: false});
        cy.get('#input-email').type('test004@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('button[type="submit"]').click();
    }

    editDetails(firstname, lastname){
        cy.get('#content > :nth-child(2) > :nth-child(1) > a').click();
        cy.get('#input-firstname').clear().type(firstname)
        cy.get('#input-lastname').clear().type(lastname);
    }

    submitButton(){
        cy.get('.text-end > .btn').click();
    }

    enterAddress(firstName, lastName, address, city, postcode){
        cy.get('#input-firstname').clear().type(firstName);
        cy.get('#input-lastname').clear().type(lastName);
        cy.get('#input-address-1').clear().type(address);
        cy.get('#input-city').clear().type(city);
        cy.get('#input-postcode').clear().type(postcode);
        cy.get('#input-country').select('99').invoke('val').should('eq', '99');
        cy.get('#input-zone').select('1505').invoke('val').should('eq', '1505');
    }

}

export default new UserManagement();