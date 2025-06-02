
Cypress.Commands.add('apiUserLogin', (fixtureFile = 'user-credentials.json') => {
  cy.fixture(fixtureFile).then((userData) => {
    cy.api({
      method: "GET",
      url: `/user/login?username=${userData.username}&password=${userData.password}`,
      headers: { "accept": "application/json" }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // You can store token or user info here if needed
    });
  });
});




