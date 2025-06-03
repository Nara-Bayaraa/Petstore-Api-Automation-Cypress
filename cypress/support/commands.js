
Cypress.Commands.add('apiUserLogin', (fixtureFile = 'user.json', resourceKey = 'userCredential') => {
  cy.fixture(fixtureFile).then((userData) => {
    cy.api({
      method: "GET",
      url: `/user/login?username=${userData.username}&password=${userData.password}`,
      headers: { "accept": "application/json" }
    }).then((response) => {
      expect(response.status).to.eq(200);
     
    });
    });
    });



Cypress.Commands.add('createResource', (fixtureFile, resourceKey, url) => {
  cy.fixture(fixtureFile).then((payload) => {
    const resource = { ...payload[resourceKey], id: Date.now() };
    cy.api({
      method: "POST",
      url, 
      body: resource,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([200, 201]).to.include(response.status);
      cy.wrap(response.body.id)
    });
  });
});

Cypress.Commands.add('createUser', (fixtureFile = 'user.json', resourceKey = 'createUser') => {
  return cy.fixture(fixtureFile).then((payload) => {
    const username = `user${Date.now()}`;

    const user = {
      ...payload[resourceKey],
      id: Date.now(),
      username, // use random username
    };
    return cy.api({
      method: "POST",
      url: "/user",
      body: user,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([200, 201]).to.include(response.status);
      cy.wrap(response.body.username);
    });
  });
});


