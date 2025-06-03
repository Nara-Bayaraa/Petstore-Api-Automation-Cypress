describe("Pet API - Delete Pet", () => {

  it("[PET-001] should delete a pet by ID", () => {
    cy.createResource("pet.json", "deleteCreatedPet", `/pet`).then((id) => {

      cy.api({
        method: "DELETE",
        url: `/${id}`,
        failOnStatusCode: false,
        headers: {
          api_key: Cypress.env("API_KEY"),
        },
      }).then((deleteResponse) => {
        expect([200, 404]).to.include(deleteResponse.status);
        cy.log(`Deleted pet with ID: ${id}`);
      });
    });
  });
});



