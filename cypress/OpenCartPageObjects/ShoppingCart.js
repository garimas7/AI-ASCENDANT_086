class ShoppingCart{

    visit(){
        cy.visit('https://demo.opencart.com/en-gb?route=account/login' ,{failOnStatusCode: false});
        cy.get('#input-email').type('test003@gmail.com');
        cy.get('#input-password').type('1234');
        cy.get('button[type="submit"]').click();
        cy.wait(4000);
        cy.get('#logo > a > .img-fluid').click();
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        
    }
}

export default new ShoppingCart();