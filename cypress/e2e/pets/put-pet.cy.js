describe("Pet API - Update Pet", () => {
  it("[PET-001] should update a pet by ID", () => {
    const updatedPet = {
      id: 1001, 
      name: "Max",
      status: "sold",
      category: { id: 1, name: "Dogs" },
      photoUrls: ["string"],
      tags: [{ id: 1, name: "tag1" }],
    };

    cy.api({
      method: "PUT",
      url: "/pet",
      body: updatedPet,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", updatedPet.id);
      expect(response.body).to.have.property("name", "Max");
      expect(response.body).to.have.property("status", "sold");
    });
  });
});
