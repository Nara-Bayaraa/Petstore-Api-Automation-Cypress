
Cypress.Commands.add('loginUser', (fixtureFile = 'user.json', resourceKey = 'userCredential') => {
 cy.fixture(fixtureFile).then((userData) => {
    return cy.api({
      method: "GET",
      url: `/user/login?username=${userData[resourceKey].username}&password=${userData[resourceKey].password}`,
      headers: { "accept": "application/json" }
    }).then((response) => {
      expect(response.status).to.eq(200);
     return cy.wrap(response.body); 
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
  return cy.fixture(fixtureFile).then((fixtureData) => {
    const userData = fixtureData[resourceKey];
    return cy.api({
      method: "POST",
      url: "/user",
      body: userData,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      return cy.wrap(userData);
    });
  });
});

