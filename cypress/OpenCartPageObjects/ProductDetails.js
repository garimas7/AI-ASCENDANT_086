class ProductDetails{

    visit(){
        cy.visit('https://demo.opencart.com/', {failOnStatusCode: false})
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click()
        cy.get(':nth-child(1) > .dropdown-menu > .see-all').click({force: true});
    }
}

export default new ProductDetails();