describe('note app', function() {
  beforeEach(function() {
    cy.visit('');
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Samuel Manor',
      username: 'smm',
      password: 'password'
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes app');
    cy.contains('note app');
  });

  it('login form can be opened', function() {
    cy.contains('login').click();
  });

  it('user can log in', function() {
    cy.contains('login').click();
    cy.get('#username').type('smm');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Samuel Manor logged in');
  });

  it('login fails with wrong password', function() {
    cy.contains('login').click();
    cy.get('#username').type('smm');
    cy.get('#password').type('hello');
    cy.get('#login-button').click();

    cy.get('.error').contains('Wrong credentials');
    cy.get('html').should('not.contain', 'Samuel Manor logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'smm', password: 'password' });
    });

    it('a new note can be created', function() {
      cy.contains('new note').click();
      cy.get('#note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'another note from cypress',
          important: true
        });
      });

      it('it can be made not important', function() {
        cy.contains('another note from cypress')
          .contains('make not important')
          .click();
        
        cy.contains('another note from cypress')
          .contains('make important');
      });
    });

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function() {
        cy.contains('second note').contains('make important').click();
        cy.contains('second note').contains('make not important');
      });
    });
  });
});