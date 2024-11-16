import OrderManagement from "../OpenCartPageObjects/OrderManagement";

describe('Order Management', () => {
    beforeEach(() => {
        OrderManagement.visit();
    });
    
    it('Verify that after placing an order, the order details (product name, quantity, price, shipping address, and order date) appear in the account’s order history.', () => {
        OrderManagement.placeOrder();    
        OrderManagement.verifyOrderInHistory();
    });
});
