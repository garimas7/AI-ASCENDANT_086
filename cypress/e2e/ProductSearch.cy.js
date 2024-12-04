/// <reference types = "Cypress" />
import ProductSearch from "../OpenCartPageObjects/ProductSearch";

describe('Product Search abd Filter Functionality', () => {
    beforeEach(() => {
        ProductSearch.visit();
    });
    it('Verify that the search functionality works as expected.', () => {
        const productName = 'MackBook';
        ProductSearch.searchProduct(productName);
        cy.get('#content>h1').contains(productName);
    });

    it('Verify that using partial keywords in the search bar displays all relevant products that contain the keyword.', () => {
        const productName = 'Phone';
        ProductSearch.searchProduct(productName);
        cy.get('.description>h4>a').should('be.visible').and('have.text', 'iPhone');
    });
    it('Verify that searching for a product using non-existent keywords', () => {
        const productName = 'abcxyz';
        ProductSearch.searchProduct(productName);
        cy.get('#content>p').should('be.visible').and('have.text', 'There is no product that matches the search criteria.');
    });
    // abcxyz @#$%^&*
    it('Verify that entering special characters only in the search', () => {
        const productName = '@#$%^&*';
        ProductSearch.searchProduct(productName);
        cy.get('#content>p').should('be.visible').and('have.text', 'There is no product that matches the search criteria.');
    });
    it('Verify that searching with no input ', () => {
        const productName = ' ';
        ProductSearch.searchProduct(productName);
        cy.get('#content>p').should('be.visible').and('have.text', 'There is no product that matches the search criteria.');
    });

    it('Verify that entering a single character in the search bar returns relevant results', () => {
        const productName = 'a';
        ProductSearch.searchProduct(productName);
        cy.get('#product-list>div').should('have.visible').and('have.length', 10)
        
    });
    it('Ensure that users can input reasonably long strings (e.g., 200-500 characters) without issues in search.', () => {
        const productName = 'a'.repeat(50);
        ProductSearch.searchProduct(productName);
        cy.contains(productName);
    });
});