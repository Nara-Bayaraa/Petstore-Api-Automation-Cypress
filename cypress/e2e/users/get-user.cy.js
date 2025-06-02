describe("User API - Get User Details, Login and Logout ", function () {
  beforeEach(function () {
    cy.fixture("user-credentials.json").then((data) => {
      this.userData = data;
    });
  });

  it("[USER-001] should get user details by username", function () {
    const userData = this.userData;
    cy.api({
      method: "GET",
      url: `https://petstore.swagger.io/v2/user/${userData.username}`,
      headers: { accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("username", userData.username);
      cy.log(JSON.stringify(response.body));
    });
  });

  it("[USER-002] should login user into the system", function () {
    const userData = this.userData;
    cy.api({
      method: "GET",
      url: `https://petstore.swagger.io/v2/user/login?username=${userData.username}&password=${userData.password}`,
      headers: { accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("[USER-003] should logout current logged in user session", () => {
    cy.api({
      method: "GET",
      url: "https://petstore.swagger.io/v2/user/logout",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
