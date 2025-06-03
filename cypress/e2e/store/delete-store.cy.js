describe("Store API - delete order", () => {
  
  it("[STORE-001] should delete a order by ID", function () {
cy.createResource('order.json', 'deleteCreatedOrder',`store/order`).then((id) => {
      cy.api({
        method: "DELETE",
        url: `/${id}`,
        failOnStatusCode: false
      }).then((deleteResponse) => {
        expect([200, 404]).to.include(deleteResponse.status);
        cy.log(`Deleted order ID: ${id}`);
      });
    });
  });
});
