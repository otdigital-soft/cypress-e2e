describe("Rename Folder", () => {
    before(() => {
        cy.login("owner")
    })

    // OWNER => RENAME FOLDER => DELETE FOLDER
    it("Rename the folder and delete the folder", () => {
        cy.get("[data-test='link-documents']", { timeout: 30000 }).click()
        cy.global_blocker_click()

        cy.wait(3000)

        cy.get("[data-test='document-body']")
            .its("length")
            .should("be.gte", 1)

        cy.get("[data-test^='row-folder-'")
            .its("length")
            .should("be.gte", 1)

        const updateDocumentName = `update-document-${Date.now()}`
        cy.get("[data-test^='row-folder-']")
            .last()
            .within(() => {
                cy.get("[data-test='rename-folder-btn']").click({ force: true })
            })
        cy.wait(1000)

        cy.get("[data-test^='row-folder-'").within(() => {
            cy.get("input[type='text']")
                .clear()
                .type(updateDocumentName)
        })
        cy.get("[data-test='document-body']").click()
        cy.wait(10000)
        cy.get("[data-test^='row-folder-'").contains(updateDocumentName)

        // delete the folder
        cy.get("[data-test^='row-folder-'")
            .its("length")
            .then(length => {
                if (length > 2) {
                    cy.get("[data-test^='row-folder-'")
                        .last()
                        .within(() => {
                            cy.get("[data-test='delete-folder-btn']").click({
                                force: true
                            })
                        })
                    cy.wait(10000)
                }
            })
    })
})
