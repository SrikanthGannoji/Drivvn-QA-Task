// Custom command to log in
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

// Custom command to add an item to the cart
Cypress.Commands.add('addToCart', (itemName: string) => {
  cy.contains('.inventory_item_name', itemName)
    .siblings('.pricebar')
    .contains('Add to cart')
    .click();
});

// Custom command to remove an item from the cart
Cypress.Commands.add('removeFromCart', (itemName: string) => {
  cy.contains('.inventory_item_name', itemName)
    .siblings('.pricebar')
    .contains('Remove')
    .click();
});

// Test scenario: Login and add items to cart
describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('should login and add items to the cart', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';

    cy.login(username, password);

    // Verify login success
    cy.url().should('include', '/inventory.html');

    // Add items to the cart
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');

    // Verify items added to the cart
    cy.get('.shopping_cart_badge').should('have.text', '2');
  });
});

// Test scenario: Login, add and remove items from the cart
describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('should login, add and remove items from the cart', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';

    cy.login(username, password);

    // Verify login success
    cy.url().should('include', '/inventory.html');

    // Add items to the cart
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');

    // Verify items added to the cart
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // Remove an item from the cart
    cy.removeFromCart('Sauce Labs Backpack');

    // Verify item removed from the cart
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
});

Explanination:
In this example, we have created custom commands login, addToCart, and removeFromCart to encapsulate common actions for reusability.
These commands take variables as parameters, allowing easy configuration.
The script demonstrates two test scenarios: one to login and add items to the cart, and another to login, add items, and then remove an item from the cart.
By abstracting the login process and cart interactions into custom commands, we enhance reusability and maintainability. 
The script can be easily configured by changing the username, password, and item names passed as arguments to the commands.
