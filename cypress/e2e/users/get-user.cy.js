describe("User API - Get User Details, Login and Logout ", function () {
  beforeEach(function () {
    cy.fixture("user.json").then((data) => {
      this.userData = data.createUser.username;
      this.userCredentials = data.userCredentials;
    });
  });

  it("[USER-001] should get user details by username", function () {
    cy.api({
      method: "GET",
      url: `/user/${this.userData}`,
      headers: { accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("username", this.userData);
      cy.log(JSON.stringify(response.body));
    });
  });

  it("[USER-002] should login user into the system", function () {
    cy.api({
      method: "GET",
      url: `/user/login?username=${this.userCredentials.username}&password=${this.userCredentials.password}`,
      headers: { accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("[USER-003] should logout current logged in user session", () => {
    cy.api({
      method: "GET",
      url: "/user/logout",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
