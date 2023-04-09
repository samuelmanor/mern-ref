describe('Bloglist', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Samuel Manor',
      username: 'smm',
      password: 'password'
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('blogs');
  });

  it('login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
  });

  it('user can log in', function() {
    cy.get('#username').type('smm');
    cy.get('#password').type('password');
    cy.get('#login-btn').click();

    cy.contains('Samuel Manor logged in');
  });

  it('user fails with wrong password', function() {
    cy.get('#username').type('smm');
    cy.get('#password').type('hello');
    cy.get('#login-btn').click();

    cy.contains('wrong username or password');
    cy.get('html').should('not.contain', 'Samuel Manor logged in');
  });
});