describe('Bloglist', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const user = {
      name: 'Samuel Manor',
      username: 'smm',
      password: 'password'
    };
    const testUser = {
      name: 'Superuser',
      username: 'root',
      password: 'toor'
    };

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser);

    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('blogs');
  });

  it('login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
  });

  describe('login', function() {
    it('user can log in', function() {
      cy.login({ username: 'smm', password: 'password' });
  
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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'smm', password: 'password' });

      cy.createBlog({
        title: 'Out There: On Not Finishing',
        author: 'Devin Kelly',
        url: 'https://longreads.com/2020/09/08/out-there-on-not-finishing/'
      });

      cy.createBlog({
        title: 'Make Peace With Your Unlived Life',
        author: 'Manfred F. R. Kets de Vries',
        url: 'https://hbr.org/2016/12/make-peace-with-your-unlived-life'
      });

      cy.createBlog({
        title: 'Death to Minimalism',
        author: 'Nathan J. Robinson',
        url: 'https://www.currentaffairs.org/2019/02/death-to-minimalism'
      })
    });

    it('a new blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#title-input').type('Neanderthals With Disabilities Survived Through Social Support');
      cy.get('#author-input').type('George Dvorsky');
      cy.get('#url-input').type('https://www.gizmodo.com.au/2017/10/neanderthals-with-disabilities-survived-through-social-support/');
      cy.get('#post-blog-btn').click();

      cy.contains('- George Dvorsky');
    });

    it('a blog can be liked', function() {
      cy.contains('view').click();
      cy.get('#like-btn').click().click();

      cy.contains('likes: 1');
    });

    it('a blog created by user can be deleted', function() {
      cy.contains('Out There').contains('view').click();
      cy.contains('delete blog').click();

      cy.get('html').should('not.contain', 'Out There');
    });
  });
});