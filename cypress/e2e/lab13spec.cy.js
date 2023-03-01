describe("Test Lab 13 - Load and Find User from Autocomplete", () => {
    it("finds the server", () => {
        cy.visit("http://localhost:5173/");
        });
    it("clicks the menu button lab 13 option", () => {
        cy.visit("http://localhost:5173/");
        cy.get("#menubtn").click();
        cy.contains("a", "Lab 13").click();
        });
    it("confirms lab 13 component loaded", () => {
        cy.visit("http://localhost:5173/");
        cy.get("#menubtn").click();
        cy.contains("a", "Lab 13").click();
        cy.contains("Lab 13");
        cy.wait(3000);       
        });
    it("types User name", () => {
        cy.visit("http://localhost:5173/");
        cy.get("#menubtn").click();
        cy.contains("a", "Lab 13").click();
        cy.contains("Lab 13");
        cy.wait(3000); 
        cy.get("#names").type("Am{downArrow}{enter}");
        });
    it("confirms User was found", () => {
        cy.visit("http://localhost:5173/");
        cy.get("#menubtn").click();
        cy.contains("a", "Lab 13").click();
        cy.contains("Lab 13");
        cy.wait(3000); 
        cy.get("#names").type("Am{downArrow}{enter}");
        cy.contains("Amber");
        });
   });