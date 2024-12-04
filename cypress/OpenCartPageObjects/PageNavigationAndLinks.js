class PageNavigationAndLinks {
    visitHomePage() {
        cy.visit('https://demo.opencart.com');
        cy.wait(2000);
    }

    navigation(){
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').trigger('mouseover').click();
        cy.wait(2000);
        cy.get(':nth-child(1) > .dropdown-menu > .see-all').click();
        cy.wait(2000);
    }
    accountDropdown(){
        cy.get(':nth-child(2) > .dropdown > .dropdown-toggle').click();
        cy.wait(2000);
    }
}

export default new PageNavigationAndLinks();
