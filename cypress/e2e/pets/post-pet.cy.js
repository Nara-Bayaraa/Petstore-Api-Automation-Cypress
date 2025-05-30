describe("Pet API - Create Pet", () => {
  it("[PET-001] should create a new pet with valid data", () => {
    cy.fixture("new-pet.json").then((newPetPayload) => {
      cy.api({
        method: "POST",
        url: "/pet",
        body: newPetPayload,
      }).then((postResponse) => {
        expect(postResponse.status).to.eq(200);
        expect(postResponse.body.name).to.eq(newPetPayload.name);
        expect(postResponse.body)
          .to.have.property("status")
          .that.equals("available");
      });
    });
  });
  it("[PET-002] should upload an image for the pet", () => {
    const petId = 1001;
    cy.fixture("images/cat.jpg", "binary").then((image) => {
      const blob = Cypress.Blob.binaryStringToBlob(image);
      const formData = new FormData();
      formData.append("file", blob );
      formData.append("additionalMetadata", "Cute cat photo");

      cy.api({
        method: "POST",
        url: `/pet/${petId}/uploadImage`,
        body: formData,
      }).then((response) => {
        expect(response.status).to.eq(200);
        if (response.body && Object.keys(response.body).length > 0) {
          expect(response.body).to.have.property("code", 200);
        }
      });
    });
  });
});
