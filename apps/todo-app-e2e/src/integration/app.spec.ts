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
    it('should not be possile as guest', () => {
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

    it('should be possile as user', () => {
      setUser('User')

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
});
