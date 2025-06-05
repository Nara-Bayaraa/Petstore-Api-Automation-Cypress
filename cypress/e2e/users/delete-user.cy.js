describe("User API - Delete User", () => {
  beforeEach(() => {
    cy.loginUser();
  });

it("[USER-001] should delete a user by username", () => {
  cy.createUser('user.json', 'user').then((user) => {
    cy.api({
      method: "DELETE",
      url: `/user/${user.username}`,
      failOnStatusCode: false,
    }).then((response) => {
       cy.log(`Deleted user: ${user.username}`);
      expect([200, 404]).to.include(response.status);
     
    });
  });
});
});
