describe("Pet API - Get Pet", () => {
  const petId = 1001;
  const petStatus = "available";

  it("[PET-001] should retrieve a pet by ID", () => {
    cy.api({
      method: "GET",
      url: `/pet/${petId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", petId);
      cy.log(JSON.stringify(response.body));
    });
  });

  it("[PET-002] should retrieve a pet By Status", () => {
    cy.api({
      method: "GET",
      url: `/pet/findByStatus?status=${petStatus}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach((pet) => {
        expect(pet).to.have.property("status", petStatus);
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  it("[PET-003] should retrive a pet By Tags", () => {
    const petTags = "";
    cy.api({
      method: "GET",
      url: "/pet/findByTags?tags=white and black",
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
    });
  });
});
