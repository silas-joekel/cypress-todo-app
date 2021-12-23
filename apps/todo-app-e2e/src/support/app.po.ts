export const getTitle = () => cy.get('h1');
export const getTodos = () => cy.get('[id^=todo-]');

export const setUser = (user: 'Admin' | 'User' | 'Guest') => cy.get('#user-select').select(user);
