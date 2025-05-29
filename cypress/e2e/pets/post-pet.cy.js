describe('Pet API - Create Pet', () => {
 
  it('[PET-001] should create a new pet with valid data', () => {
    cy.fixture('new-pet.json').then((newPetPayload) => {
    cy.api({
        method: 'POST',
        url: '/pet',
        body: newPetPayload
    }).then((postResponse)=>{
        expect(postResponse.status).to.eq(200);
        expect(postResponse.body.name).to.eq(newPetPayload.name);
         expect(postResponse.body).to.have.property("status").that.equals("available");
    })

    })
  });
});
