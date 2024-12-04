import OrderManagement from "../OpenCartPageObjects/OrderManagement";

describe('Order Management', () => {
    beforeEach(() => {
        OrderManagement.visit();
    });
    
    it('Verify that after placing an order, the order details (product name, quantity, price, shipping address, and order date) appear in the account’s order history.', () => {
        OrderManagement.placeOrder();    
        OrderManagement.verifyOrderInHistory();
    });
    it('Place multiple orders and navigate to the order history section to check if all orders are listed with their correct details.', () => {
        
    });
    it('Verify that when no orders are placed, the order history is empty.', () => {
        
    });
    it('Place an order containing more than 10 items and view the order summary.', () => {
        
    });
    it('Place an order with the maximum allowed order value (based on the platforms limitations) and check the order summary.', () => {
        
    });
});
