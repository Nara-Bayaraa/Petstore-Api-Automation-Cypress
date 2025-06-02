describe("Store API - delete order", () => {
  beforeEach(function () {
    cy.fixture("pet.json").then((payload) => {
      this.petPaylaod = payload;
    });
  });

  it("[STORE-001] should delete a order by ID", function () {
    const petPaylaod = this.petPaylaod;
    cy.api({
      method: "DELETE",
      url: `/store/petPaylaod.order/${orderId}`,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 204]);
    });
  });
});
