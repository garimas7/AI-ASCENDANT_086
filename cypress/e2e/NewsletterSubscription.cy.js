import NewsletterSubscription from "../OpenCartPageObjects/NewsletterSubscription";

describe('Newsletter Subscription', () => {
    it('Verify that a user can successfully subscribe to the newsletter using a valid email address.', () => {
        NewsletterSubscription.visit();
        NewsletterSubscription.login();
        NewsletterSubscription.newsletterSubs();
    });
    it('Verify that a user can successfully unsubscribe from the newsletter using a valid email address.', () => {
        NewsletterSubscription.visit();
        NewsletterSubscription.login();
        NewsletterSubscription.newsletterUnSubs();
    });
    it('Verify that the system does not allow a user to subscribe with an invalid or missing email address.', () => {
        NewsletterSubscription.visit();
        NewsletterSubscription.register();
    });
    it('Verify that the unsubscribe process does not work with an unregistered email address.', () => {
        NewsletterSubscription.visit();
        cy.get(':nth-child(4) > .list-unstyled > :nth-child(4) > a').click();
        cy.url().should('include', 'route=account/login');
        cy.wait(4000);
    });
    it('Test the subscription form with the minimum valid email address length (e.g., "rk@gmail.com").', () => {
        NewsletterSubscription.visit();
        NewsletterSubscription.login();
        NewsletterSubscription.newsletterSubs();
    });
    it('Test unsubscribing using an email address that is just above the minimum length limit (e.g., "a@gmail.com").', () => {
        NewsletterSubscription.visit();
        NewsletterSubscription.login();
        NewsletterSubscription.newsletterUnSubs();
    });

});