describe("User API - Delete User", () => {
  beforeEach(() => {
    cy.apiUserLogin();
  });

it("[STORE-001] should delete a user by ID", () => {
  cy.createUser('user.json', 'deleteCreatedUser').then((username) => {
    cy.api({
      method: "DELETE",
      url: `/user/${username}`,
      failOnStatusCode: false,
    }).then((response) => {
       cy.log(`Deleted user: ${username}`);
      expect([200, 404]).to.include(response.status);
     
    });
  });
});
});
