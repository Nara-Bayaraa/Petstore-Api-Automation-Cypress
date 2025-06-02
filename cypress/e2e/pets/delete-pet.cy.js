describe("Pet API - Delete Pet", () => {
  it("[PET-001] should delete a pet by ID", () => {
    const petId = 1001;
    cy.api({
      method: "DELETE",
      url: `/pet/${petId}`,
      headers: {
        api_key: Cypress.env("API_KEY"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
