export const getTitle = () => cy.get('h1');
export const getTodos = () => cy.get('[id^=todo-]');

export const setUser = (user: 'Admin' | 'User' | 'Guest') =>
  cy.get('#user-select').select(user);

export type Role = 'Admin' | 'User' | 'Guest';
export type FeatureTest = {
  title: string;
  testFunction: () => void;
  accessibility: {
    [role in Role]: boolean;
  };
};
export const testRoleBasedFeatures = (features: FeatureTest[]) => {
  Cypress.config('defaultCommandTimeout', 500);

  const wronglyPassingTestError = 'Feature should not work but somehow passed';
  let failed: string | undefined = undefined;
  afterEach(function () {
    const title = this.currentTest?.title || '';
    if (title.startsWith('should not be possible')) {
      if (failed) {
        cy.log(failed);
      } else throw new Error(wronglyPassingTestError);
      failed = undefined;
    }
  });

  features.forEach((feature) => {
    describe(feature.title, () => {
      (Object.keys(feature.accessibility) as Role[]).forEach((role) => {
        if (feature.accessibility[role])
          it(`should be possible as ${role}`, () => {
            setUser(role);
            feature.testFunction();
          });
        else {
          it(`should not be possible as ${role}`, () => {
            cy.on('fail', (error) => {
              if (error.message === wronglyPassingTestError) {
                throw error;
              } else {
                failed = `Feature "${feature.title}" is intended to fail for ${role}`;
                console.log(failed);
              }
            });

            setUser(role);
            feature.testFunction();
          });
        }
      });
    });
  });
};
