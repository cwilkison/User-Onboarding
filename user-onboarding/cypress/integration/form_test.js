describe("Testing our volunteer form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/");
    });
    it("Add test to inputs and submit form", function() {
      cy.get('input[name="name"]')
        .type("Cole")
        .should("have.value", "Cole");
    cy.get('input[name="email"]')
        .type("email@email.com")
        .should("have.value", "email@email.com");
    cy.get('input[name="password"]')
        .type("password")
        .should("have.value", "password");
    cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");
    cy.get("button").click();
        
    });
  });