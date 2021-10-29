describe('Adding New ToDo Item', function () {
    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('renders correctly', () => {
        cy.findByRole("textbox", {name: "Input New To-Do Item"})
            .should('exist')
        cy.findByRole("button", {name: "Add Item"})
            .should('exist')
    });

    it("allows user to input text into the text field", () => {
        cy.findByRole("textbox", {name: "Input New To-Do Item"}).type("Feed the dog")
        cy.findByRole("textbox", {name: "Input New To-Do Item"})
            .should('have.value', "Feed the dog")
    });

    it("adds item to the list", () => {
        cy.findByRole("button", {name: "Add Item"}).click()
        cy.findByRole("listitem")
            .should('contain.text', "Feed the dog")
    });

    it("can check the completed box", () => {
        const completedCheckBox = cy.findByRole("checkbox");

        completedCheckBox.check()
        completedCheckBox
            .should('be.checked')
        completedCheckBox.uncheck()
        completedCheckBox
            .should('not.be.checked')
    });
});

describe("Editing an item", () => {
    it("clicking the edit button opens the edit view", () => {
        cy.findByRole("button", {name:"Edit"}).click()
        cy.findByRole('textbox', {name:""})
            .should("exist")
        cy.findByRole("button", {name:"Save"})
            .should("exist")
        cy.findByRole("button", {name:"Edit"})
            .should("not.exist")
    });

    it("saves the new content", () => {
        cy.findByRole('textbox', {name:""}).type(" and cat")
        cy.findByRole('textbox', {name:""})
            .should("have.value", "Feed the dog and cat")
        cy.findByRole("button", {name:"Save"}).click()
        cy.findByRole('textbox', {name:""})
            .should("not.exist")
        cy.findByRole("button", {name:"Save"})
            .should("not.exist")
        cy.findByRole("button", {name:"Edit"})
            .should("exist")
        cy.findByRole("listitem")
            .should('contain.text', "Feed the dog and cat")
    });

    it("allows user to delete entry", () => {
        cy.findByRole("button", {name:"Delete"}).click()
        cy.findByRole('listitem').should('not.exist')
    });
});