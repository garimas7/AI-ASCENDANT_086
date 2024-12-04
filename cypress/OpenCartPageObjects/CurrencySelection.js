class CurrencySelection {
    visit() {
        cy.visit('https://demo.opencart.com/en-gb?route=account/login', { failOnStatusCode: false });
        cy.get('#input-email').type('test003@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.get('.img-fluid').click();
    }

    selectCurrency(currency){
        cy.get('#form-currency > .dropdown').click();
        cy.wait(2000);
        cy.contains('.dropdown-menu li', currency).click();
        cy.wait(2000);
    }
    verifyCurrencySymbol(symbol) {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > .price > .price-new').each(($price) => {
            expect($price.text()).to.include(symbol);
        });
    }
    addProductToCart() {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.wait(2000);
        cy.get('#button-cart').click();
        cy.wait(2000);
    }
    verifyTotalOrderPrice(symbol) {
        cy.get('.list-inline > :nth-child(4)').click();
        cy.wait(2000);
        cy.get('.table > tfoot > tr:last-child > td:last-child').should('contain.text', symbol);
    }

    verifyPreferencesPreservedAfterLogin(currency) {
        cy.get('.nav.float-end>ul>li:nth-child(2)').click();
        cy.wait(2000);
        cy.get(':nth-child(5) > .dropdown-item').click();
        cy.wait(2000);
        cy.get('.nav.float-end>ul>li:nth-child(2)').click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .dropdown > .dropdown-menu > :nth-child(2) > .dropdown-item').click();
        cy.wait(2000);
        cy.get('#input-email').type('test003@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('button[type="submit"]').click({force: true});
        cy.wait(2000);
        cy.get('#form-currency > .dropdown').should('contain.text', currency);
    }
}

export default new CurrencySelection();
