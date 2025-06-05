describe("User API - Update User", () => {
  beforeEach(() => {
    cy.loginUser();
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

 cy.createUser("user.json", "createUser").then((createUser) => {
      cy.api({
        method: "PUT",
        url: `/user/${createUser.username}`,
        body: updatedUser,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        expect(response.status).to.eq(200);
         cy.log(JSON.stringify(response.body));
      });
    });
  });
});
