/// <reference types = "Cypress" />
import ShoppingCart from "../OpenCartPageObjects/ShoppingCart";

beforeEach(() => {
    ShoppingCart.visit();
});
describe('Shopping Cart', () => {
    it.skip('Verify that adding a product to the shopping cart from the Product Details page correctly reflects the selected product in the cart with accurate details', () => {
       
        cy.get('h1').should('be.visible').and('have.text', 'MacBook');
        cy.get('.price-new').should('be.visible').and('have.text', '$602.00');
        cy.get('#input-quantity').should('be.visible').and('have.value', '1')
    });
    it.skip('Verify that the user can successfully update the quantity of an item in the cart and that the total price updates accordingly.', () => {
        cy.get('#button-cart').click({ force: true });
        cy.get('.dropdown > .btn').click({ force: true });
        cy.get('.list-inline > :nth-child(4) > a').click();
        cy.get('.table-responsive > .table > tbody > tr > :nth-child(5)').should('be.visible').and('have.text', '$602.00');
        cy.get('form > .input-group > .form-control').clear().type('3');
        cy.get('.input-group > .btn-primary').click();
        cy.get('tbody > tr > :nth-child(6)').should('be.visible').and('have.text', '$1,802.00');
    });
    it.skip('Verify that the system prevents adding an in-stock product to the cart with some huge quantity', () => {
        cy.get('#button-cart').click({ force: true });
        cy.get('.list-inline > :nth-child(4)').click();
        cy.get('form > .input-group > .form-control').clear().type('10000');
        cy.get('.input-group > .btn-primary').click();  
        cy.reload();
        cy.get('.alert').should('be.visible').and('have.text', ' Products marked with *** are not available in the desired quantity or not in stock! ')
    });
    it.skip('Verify that attempting to set the item quantity to a non-numeric or negative value in the shopping cart triggers an error message or resets to a valid quantity or Your shopping cart is empty!.', () => {
        cy.get('#button-cart').click({ force: true });
        cy.get('.list-inline > :nth-child(4)').click();
        cy.get('form > .input-group > .form-control').clear().type('abcd');
        cy.get('.input-group > .btn-primary').click(); 
        cy.get('#checkout-total > :nth-child(1) > :nth-child(2)').should('be.visible').and('have.text','$0.00');
    });
    it.skip('Verify that the cart can handle multiple items with varying quantities and prices without display or calculation errors.', () => {
        cy.get('#input-quantity').clear().type('3');
        cy.get('#button-cart').click({ force: true }); 
        cy.go('back');

        cy.get(':nth-child(2) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('#input-quantity').clear().type('3');
        cy.get('#button-cart').click({ force: true });
    
        cy.get('.list-inline > :nth-child(4)').click();
    
        cy.get('.table-responsive > .table > tbody > tr')
            .should('have.length', 2) 
            .each(($row, index) => {
                if (index === 0) {
                    cy.wrap($row).find('.input-group > .form-control').should('have.value', '3');
                    cy.wrap($row).find('.price').should('have.text', '$602.00');
                } 
                else {
                    cy.wrap($row).find('.input-group > .form-control').should('have.value', '3');
                    cy.wrap($row).find('.price').should('have.text', '$602.00');
                }
            });
    
        cy.get('.table-responsive > .table > tfoot > tr > td').last()
            .should('have.text', '$3,612.00');
    });

    it('Verify that removing all items from the cart displays an appropriate "Your cart is empty" message.', () => {
        cy.get('.list-inline > :nth-child(4)').click();
        cy.get('.dropdown > .btn-lg').click();
    });
    
});