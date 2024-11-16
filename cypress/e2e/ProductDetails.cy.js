import ProductDetails from "../OpenCartPageObjects/ProductDetails";

describe('Product Details Page', () => {
    beforeEach(() => {
        ProductDetails.visit();
    });
    it.skip('Verify that clicking on a product from the product listing page displays the correct product details', () => {
        
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('h1').should('be.visible').and('have.text', 'Apple Cinema 30"')
        cy.get('#content > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('be.visible').and('have.text', 'Product Code: Product 15')
        cy.get('h2 > .price-new').should('be.visible').and('have.text', '$110.00')
        cy.get('[href="https://demo.opencart.com/image/cache/catalog/demo/apple_cinema_30-800x800.jpg"] > .img-thumbnail').should('be.visible');

    });

    it.skip('Verify that the "Add to Cart" button is visible and functional for in-stock items on the Product Details page.', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > form > .button-group > [formaction="https://demo.opencart.com/en-gb?route=checkout/cart.add"]').should('be.visible')
    });

    it.skip('The product data is missing or incomplete (e.g., no product name, no description, or no images).', () => {
        cy.get(':nth-child(10) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('#tab-description > p').should('be.visible').and('have.text', '\n\tProduct 8')   // fail
    });

    it.skip('Verify that the description of the product is more than 15 words', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('[face="helvetica,geneva,arial"] > :nth-child(1)')
          .invoke('text')
          .then((text) => {
            const wordCount = text.split(' ').filter((word) => word.trim().length > 0).length;
            expect(wordCount).to.be.greaterThan(15);
          });
    });
    it.skip('Verify Product Details page navigation using browser back and forward buttons', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.url().should('include', 'product/desktop');
        cy.get('h1').should('be.visible');
        cy.get('#tab-description').should('be.visible');
        cy.go('back');
        cy.url().should('not.include', 'product/product');
        cy.get('.product-thumb').should('exist');
        cy.go('forward');
        cy.url().should('include', 'product/desktop');
        cy.get('h1').should('be.visible');
        cy.get('#tab-description').should('be.visible');
    });
    
    it.skip('The product price is greater than 0', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('h2 > .price-new')
        .invoke('text')
        .then((priceText) => {
            const price = parseFloat(priceText.replace('$', '').trim());
            expect(price).to.be.greaterThan(0);
        });
    });

    it('The product description exceeds the typical character limit (e.g., 100 characters of the product description.', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('#tab-description > :nth-child(1)')
          .invoke('text')
          .then((text) => {
            const wordCount = text.split(' ').filter((word) => word.trim().length > 0).length;
            expect(wordCount).to.be.greaterThan(100);
          });
    });
    

});