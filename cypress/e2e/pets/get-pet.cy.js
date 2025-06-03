describe("Pet API - Get Pet", () => {
  beforeEach(function () {
    cy.fixture("pet.json").then((data) => {
      this.petId = data.createPet.id;
      this.petStatus = data.createPet.status;
    });
  });

  it("[PET-001] should retrieve a pet by ID", function () {
    cy.api({
      method: "GET",
      url: `/pet/${this.petId}`,
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", this.petId);
    });
  });

  it("[PET-002] should retrieve a pet By Status", function () {
    cy.api({
      method: "GET",
      url: `/pet/findByStatus?status=${this.petStatus}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach((pet) => {
        expect(pet).to.have.property("status", this.petStatus);
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
