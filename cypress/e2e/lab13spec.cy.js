describe("Test Lab 13 - Load and Find User from Autocomplete", () => {
    it("finds the server", () => {
        cy.visit("http://localhost:5173/");
        });
    it("clicks the menu button lab 13 option", () => {
        cy.get("#menubtn").click();
        // cy.contains("a", "Lab 13").click();
        });
    // it("confirms lab 13 component loaded", () => {
    //     cy.contains("Lab 13");
    //     cy.wait(3000);       
    //     });
    // it("types User name", () => {
    //     cy.visit("http://localhost:5173/");
    //     cy.get("#fruits").type("banana{downArrow}{enter}");
    //     cy.contains("You selected Banana");
    //     });
    // it("confirms User was found", () => {
    //     cy.visit("http://localhost:5173/");
    //     cy.get("#fruits").type("banana{downArrow}{enter}");
    //     cy.contains("You selected Banana");
    //     });
   });