describe("User API - Get User Details, Login and Logout ", ()=> {
  let userCredential;

  beforeEach(()=> {
    cy.fixture("user.json").then((data) => {
      userCredential = data.userCredential;
    });
  });

  it("[USER-001] should create and get user by username", ()=> {
    cy.createUser("user.json", "createUser").then((createUser) => {
      cy.api({
        method: "GET",
        url: `/user/${createUser.username}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("username", createUser.username);
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  it("[USER-002] should login user into the system", ()=> {
    cy.api({
      method: "GET",
      url: `/user/login?username=${userCredential.username}&password=${userCredential.password}`,
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
