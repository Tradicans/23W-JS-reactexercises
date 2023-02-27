describe("Test Lab 12 Sentence Builder", () => {
    it("finds the server and builds a sentence", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#sentence").type("{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
    cy.get("#sentence").type("{downArrow}{downArrow}{enter}");
     cy.contains("The quick brown fox jumps over the lazy dog");
    });
   });