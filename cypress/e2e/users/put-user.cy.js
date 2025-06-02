describe("User API - Update User", () => {
  beforeEach(() => {
    cy.apiUserLogin();
  });

  it("[USER-001] should update user details by an existing username", () => {
    const updatedUser = {
      id: 1011,
      username: "User",
      firstName: "Sara",
      lastName: "Sasha",
      email: "SS@gmail.com",
      password: "012345",
      phone: "012345",
      userStatus: 1,
    };

    cy.fixture("user.json").then((userData) => {
      cy.api({
        method: "PUT",
        url: `https://petstore.swagger.io/v2/user/${userData.username}`,
        body: updatedUser,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property(
          "message",
          updatedUser.id.toString()
        );
      });
    });
  });
});
