describe("User API - Create User", () => {
  beforeEach(() => {
    cy.apiUserLogin();
  });

  it("[USER-001] should create a user", () => {
    cy.fixture("user.json").then((userPayload) => {
      cy.api({
        method: "POST",
        url: "/user",
        body: userPayload,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body).to.have.property("code", 200);
        expect(response.body).to.have.property("type", "unknown");
        expect(response.body).to.have.property("message");
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  it("[USER-002] should create multiple users", () => {
    cy.fixture("users-list.json").then((usersListPayload) => {
      cy.api({
        method: "POST",
        url: "/user/createWithList",
        failOnStatusCode: false,
        body: usersListPayload,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body).to.have.property("code", 200);
        expect(response.body).to.have.property("message");
        cy.log(JSON.stringify(response.body));
      });
    });
  });
});
