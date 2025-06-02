describe("Pet API - Create Pet", () => {
  beforeEach(function () {
    cy.fixture("pet.json").then((payload) => {
      this.petPayload = payload;
    });
  });

  it("[PET-001] should add a new pet to the store", function () {
    const petPayload = this.petPayload;
    cy.api({
      method: "POST",
      url: "/pet",
      body: petPayload,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(petPayload.name);
      expect(response.body.tags.length).to.eq(3);
      expect(response.body.tags.map((tag) => tag.name)).to.include.members([
        "white and black",
        "green eyes",
        "cute",
      ]);
      cy.log(JSON.stringify(response.body));
    });
  });

  it("[PET-002] should upload an image for the pet", function () {
   const petPayload = this.petPayload;
    const additionalMetadata = "Cute cat photo";

    cy.fixture("images/cat.jpg", "binary").then((fileContent) => {
      cy.api({
        method: "POST",
        url: `/pet/${petPayload.id}/uploadImage?additionalMetadata=${additionalMetadata}`,
        body: fileContent,
        headers: {
          "Content-Type": "application/octet-stream",
        },
        encoding: "binary",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("photoUrls").and.be.an("array");
        expect(response.body.photoUrls).to.not.be.null;
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  it("[PET-003] should updates a pet resource based on the form data", function () {
   const petPayload = this.petPayload;
    cy.api({
      method: "POST",
      url: `/pet/${petPayload.id}?name=queen&status=pending`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "queen");
      expect(response.body).to.have.property("status", "pending");
      expect(response.body).to.have.property("id", petPayload.id);
      cy.log(JSON.stringify(response.body));
    });
  });
});
