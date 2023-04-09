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
});