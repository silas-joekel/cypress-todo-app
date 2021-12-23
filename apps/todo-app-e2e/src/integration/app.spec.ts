import { getTitle, getTodos, setUser } from '../support/app.po';

describe('todo-app', () => {
  beforeEach(() => cy.visit('/'));

  it("should have 'Simple Todo App' as title", () => {
    getTitle().contains('Simple Todo App');
  });

  describe('see todo items', () => {
    it('should be possible as guest', () => {
      const todos = getTodos();

      todos.should('have.length', 10);

      todos.contains('First Todo Item');
    });
  });

  describe('see done status of todo items', () => {
    it('should be possile as guest', () => {
      getTodos()
        .first()
        .find('[type="checkbox"]')
        .should('exist')
        .should('not.be.checked');

      cy.contains('Develop Angular App')
        .parent()
        .find('[type="checkbox"]')
        .should('exist')
        .should('be.checked');
    });
  });

  describe('toggle done status of todo items', () => {
    it('should not be possible as guest', () => {
      getTodos()
        .first()
        .find('[type="checkbox"]')
        .should('exist')
        .should('be.disabled');

      cy.contains('Develop Angular App')
        .parent()
        .find('[type="checkbox"]')
        .should('exist')
        .should('be.disabled');
    });

    it('should be possible as user', () => {
      setUser('User');

      getTodos()
        .first()
        .find('[type="checkbox"]')
        .should('exist')
        .check()
        .should('be.checked');

      cy.contains('Develop Angular App')
        .parent()
        .find('[type="checkbox"]')
        .should('exist')
        .uncheck()
        .should('not.be.checked');
    });
  });

  describe('delete todo items', () => {
    it('should not be possible as user', () => {
      setUser('User');

      getTodos().first().find('button').should('not.exist');

      cy.contains('Develop Angular App')
        .parent()
        .find('button')
        .should('not.exist');
    });

    it('should be possible as admin', () => {
      setUser('Admin');

      getTodos().first().find('button').should('exist').click();

      cy.contains('First Todo Item').should('not.exist');

      cy.contains('Develop Angular App')
        .parent()
        .find('button')
        .should('exist')
        .click();

      cy.contains('Develop Angular App').should('not.exist');
    });
  });

  describe('create todo items', () => {
    it('should not be possible as user', () => {
      setUser('User');

      cy.get('#new-todo')
        .should('not.exist');
    });

    it('should be possible as admin', () => {
      setUser('Admin');

      cy.get('[id=new-todo]')
        .should('exist').type('New Todo item').type('{enter}').should('have.value', '');

        cy.contains('New Todo item')
        .parent()
        .find('[type="checkbox"]')
        .should('exist')
        .should('not.be.checked');
    });
  });
});
