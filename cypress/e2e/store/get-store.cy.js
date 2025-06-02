describe("Store API - Get Store Inventory", () => {
  
  it("[STORE-001] should return pet inventories by status", () => {
    cy.api({
      method: "GET",
      url: "/store/inventory",
    }).then((response) => {
      expect(response.status).to.eq(200);
       cy.log(JSON.stringify(response.body));
    });
  });

  it("[STORE-002] retrieve purchase order by ID", () => {
    const orderId = 101;
    cy.api({
      method: "GET",
      url: `store/order/${orderId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 101);
      expect(response.body).to.have.property("petId");
      cy.log(JSON.stringify(response.body));
    });
  });
});
