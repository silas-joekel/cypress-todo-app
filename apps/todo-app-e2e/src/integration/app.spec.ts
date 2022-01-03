import { FeatureTest, getTitle, getTodos, testRoleBasedFeatures } from '../support/app.po';

const features: FeatureTest[] = [
  {
    title: 'see todo items',
    testFunction: () => {
      const todos = getTodos();

      todos.should('have.length', 10);

      todos.contains('First Todo Item');
    },
    accessibility: {
      Guest: true,
      User: true,
      Admin: true,
    },
  },
  {
    title: 'see done status of todo items',
    testFunction: () => {
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
    },
    accessibility: {
      Guest: true,
      User: true,
      Admin: true,
    },
  },
  {
    title: 'toggle done status of todo items',
    testFunction: () => {
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
    },
    accessibility: {
      Guest: false,
      User: true,
      Admin: true,
    },
  },
  {
    title: 'delete todo items',
    testFunction: () => {
      getTodos().first().find('button').should('exist').click();

      cy.contains('First Todo Item').should('not.exist');

      cy.contains('Develop Angular App')
        .parent()
        .find('button')
        .should('exist')
        .click();

      cy.contains('Develop Angular App').should('not.exist');
    },
    accessibility: {
      Guest: false,
      User: false,
      Admin: true,
    },
  },
  {
    title: 'create todo items',
    testFunction: () => {
      cy.get('[id=new-todo]')
        .should('exist')
        .type('New Todo item')
        .type('{enter}')
        .should('have.value', '');

      cy.contains('New Todo item')
        .parent()
        .find('[type="checkbox"]')
        .should('exist')
        .should('not.be.checked');
    },
    accessibility: {
      Guest: false,
      User: false,
      Admin: true,
    },
  },
];

describe('todo-app', () => {
  beforeEach(() => cy.visit('/'));

  it("should have 'Simple Todo App' as title", () => {
    getTitle().contains('Simple Todo App');
  });

  testRoleBasedFeatures(features);
});
