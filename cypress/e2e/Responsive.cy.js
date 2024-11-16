import Responsive from "../OpenCartPageObjects/Responsive";

describe('Responsive Design Test', () => {
  
    beforeEach(() => {
        Responsive.visit();
    });
    it('Verify that the layout adjusts properly on mobile devices', () => {
      Responsive.verifyLayoutOnMobile();
    });
  
    it('Ensure that the main navigation menu is accessible and functional on mobile devices', () => {
      Responsive.verifyNavigationMenuOnMobile();
    });
  
    it('Verify that all interactive elements (buttons, forms, links) work correctly in all browsers', () => {
      Responsive.verifyInteractiveElements();
    });
  
    it('Verify that no content overflows outside the mobile screen width', () => { // fail
      Responsive.verifyNoContentOverflow();
    });
  
    it('Verify that mobile users can click or tap all buttons and links easily without overlap', () => {
      Responsive.verifyButtonAndLinkTapping();
    });
  
    it('Ensure that JavaScript functions (such as form validation, dynamic content loading) work properly in all browsers', () => {
      Responsive.verifyJavaScriptFunctions();
    });
  
    it('Test the website on a mobile device with a small screen (e.g., an older iPhone model or a low-end Android)', () => {
      Responsive.verifyOnSmallMobileScreen();
    });
  
    it('Test the website on mobile devices with different screen orientations (landscape vs. portrait)', () => {
      Responsive.verifyOrientation();
    });
  
    it('Verify that content such as images or text does not get cut off at the edge of the mobile screen in portrait mode', () => {
      Responsive.verifyNoContentCutOff();
    });
  
    it('Check that all clickable elements (buttons, links, forms) are within easy reach on small-screen devices', () => {
      Responsive.verifyClickableElementsAccessibility();
    });
  
  });