class OrderManagement {
    visit() {
        cy.visit('https://demo.opencart.com/en-gb?route=account/login', { failOnStatusCode: false });
        cy.get('#input-email').type('test003@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.get('.img-fluid').click();
    }

    placeOrder() {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.wait(10000);
        cy.get('#input-quantity').clear().type('2');
        cy.get('#button-cart').click();
        cy.wait(5000);
        cy.get('.list-inline > :nth-child(4)').click();
        cy.get(':nth-child(7) > .text-end > .btn').click();
        cy.get('.table-responsive > .table > tbody > tr > .text-start').contains('MacBook');
        cy.get('.table-responsive > .table > tbody > tr > .text-end').should('be.visible').and('have.text', '$1,202.00');
        cy.get('.table-responsive > .table > tbody > tr > .text-start').contains('2x');
    }

    verifyOrderInHistory() {
        cy.get('.list-group').contains('Order History').click();
        cy.wait(2000);
        cy.get('.table-responsive > .table > tbody > tr').first().within(() => {
            cy.get('.text-start').contains('MacBook');
            cy.get('.text-start').contains('2x');
            cy.get('.text-end').should('have.text', '$1202.00');
        });
        cy.get('.table-responsive > .table > tbody > tr').first().within(() => {
            cy.get('.text-start').contains('Shipping Address:');
            cy.get('.text-end').contains('Order Date:');
        });
    }
}

export default new OrderManagement();
