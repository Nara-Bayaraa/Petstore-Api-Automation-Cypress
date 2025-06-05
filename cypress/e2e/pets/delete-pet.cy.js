describe("Pet API - Delete Pet", () => {

  it("[PET-001] should delete a pet by ID", () => {
    cy.createResource("pet.json", "pet", `/pet`).then((id) => {
      cy.api({
        method: "DELETE",
        url: `/${id}`,
        headers: {
          api_key: Cypress.env("API_KEY"),
        },
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        expect([200, 404]).to.include(deleteResponse.status);
        cy.log(`Deleted pet with ID: ${id}`);
      });
    });
  });
});



