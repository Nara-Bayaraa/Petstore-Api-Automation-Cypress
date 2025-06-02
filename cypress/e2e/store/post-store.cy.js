describe("Store API - Create Order", () => {

  it("[STORE-001] should place a new order in the store", () => {
    cy.fixture("order.json").then((orderPayload) => {
      cy.api({
        method: "POST",
        url: "/store/order",
        body: orderPayload,
        headers: {"Content-Type": "application/json" },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", 101);
        expect(response.body).to.have.property("petId", 1001);
         cy.log(JSON.stringify(response.body));
      });
    });
  });
});
