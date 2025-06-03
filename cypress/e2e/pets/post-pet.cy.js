describe("Pet API - Create Pet", () => {
  beforeEach(function () {
    cy.fixture("pet.json").then((payload) => {
      this.petPayload = payload.createPet;
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
    const petId = this.petPayload.id;
    const additionalMetadata = "Cute cat photo";

    cy.fixture("images/cat.jpg", "binary").then((fileContent) => {
      const image = Cypress.Blob.binaryStringToBlob(fileContent);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("additionalMetadata", additionalMetadata);

      cy.api({
        method: "POST",
        url: `/pet/${petId}/uploadImage`,
        body: formData,
        additionalMetadata,
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      }).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
      });
    });
  });

  it("[PET-003] should updates a pet resource based on the form data", function () {
    const petId = this.petPayload.id;
    const updatedName = "Queen";
    const updatedStatus = "pending";

    cy.api({
      method: "POST",
      url: `/pet/${petId}`,
      form: true,
      body: {
        name: updatedName,
        status: updatedStatus,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
      expect(response.body).to.have.property("code", 200);
      expect(response.body).to.have.property("type", "unknown");
      expect(response.body).to.have.property("message", petId.toString());
    });
  });
});
