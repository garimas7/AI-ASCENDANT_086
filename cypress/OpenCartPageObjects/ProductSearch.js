class ProductSearch{
    visit(){
        cy.visit('https://demo.opencart.com/',{failOnStatusCode: false});
    }

    searchProduct(productName){
        cy.get('input[placeholder="Search"]').clear().type(productName);
        cy.get('.btn.btn-light.btn-lg').click();
    }
}

export default new ProductSearch();