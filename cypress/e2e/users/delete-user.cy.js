describe("User API - Delete User", () => {
  beforeEach(() => {
    cy.apiUserLogin();
  });

  it("[STORE-001] should delete a user by ID", () => {
    cy.fixture("user.json").then((userData) => {
      cy.api({
        method: "DELETE",
        url: `https://petstore.swagger.io/v2/user/${userData.username}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
