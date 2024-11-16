import WishList from "../OpenCartPageObjects/WishList";

describe('Wishlist Functionality', () => {
    beforeEach(() => {
        WishList.visit();
    });
    it.skip('Verify that a user can successfully add a product to the wishlist from the product details page.', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('[formaction="https://demo.opencart.com/en-gb?route=account/wishlist.add"]').click();
        cy.get('.nav.float-end>ul>li:nth-child(3)').click();
        cy.get('tbody > tr > :nth-child(2)').contains('MacBook');
    });

    it.skip('Verify that the user can view all items in the wishlist when they navigate to the wishlist page.', () => {
        cy.get(':nth-child(2) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('.btn-group > [formaction="https://demo.opencart.com/en-gb?route=account/wishlist.add"]').click();
        cy.get('.nav.float-end>ul>li:nth-child(3)').click();
        cy.get('.table-responsive>table>tbody>tr').should('be.visible').and('have.length', '2');

    });
    it.skip('Verify that attempting to add the same product to the wishlist multiple times does not result in duplicates.', () => {
        cy.get(':nth-child(1) > .product-thumb > .content > .description > h4 > a').click();
        cy.get('[formaction="https://demo.opencart.com/en-gb?route=account/wishlist.add"]').click();
        cy.get('.nav.float-end>ul>li:nth-child(3)').click();
        cy.get('table tbody tr')
          .find('td:nth-child(2)')
          .contains('MacBook')
          .should('have.length', 1);
    });
    it.skip('Verify that the wishlist page can handle multiple products being added at once without crashing or displaying errors.', () => {
        cy.get('.list-inline > :nth-child(3)').click();
        cy.get('.table-responsive>table>tbody>tr').should('be.visible').and('have.length', '2');
    });
    it.skip('Verify that when a user removes an item from the wishlist, the item is permanently deleted and no longer appears in the wishlist.', () => {
        cy.get('.list-inline > :nth-child(3)').click();
        cy.get(':nth-child(2) > :nth-child(6) > form > .btn-danger').click();
        cy.get('.table-responsive>table>tbody>tr').should('be.visible').and('contain','MacBook');
    });

    it('Verify the maximum number of items that can be added to the wishlist.', () => {
        cy.get('.list-inline > :nth-child(3)').click();
        cy.get('.table-responsive>table>tbody>tr').should('be.visible').and('have.length.at.least', 10);
    });
});