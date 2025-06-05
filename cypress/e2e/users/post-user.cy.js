describe("User API - Create User", () => {
  beforeEach(function () {
    cy.loginUser();
  });

  it("[USER-001] should create a user", function () {
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

  it("[USER-002] should create multiple users", function (){
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
