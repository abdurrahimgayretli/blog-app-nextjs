
describe("comment test", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="blogCard"]').first().click();
    cy.get("textarea").type("test comment");
    cy.get("input").first().type("tester");
    cy.get("input").last().type("test@test.com");
    cy.get('button').last().click()
  });
});
