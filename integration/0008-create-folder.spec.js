describe("Create Folder", () => {
    before(() => {
        cy.login("owner")
    })

    // OWNER => DOCUMENTS =>  => Upload
    it("Upload Document", () => {
        cy.get("[data-test='link-documents']", { timeout: 30000 }).click()
        cy.global_blocker_click()

        cy.wait(3000)

        cy.get("[data-test='document-body']")
            .its("length")
            .should("be.gte", 1)

        cy.get("[data-test='button-document']")
            .its("length")
            .should("be.gte", 1)

        const newDocumentName = `new-document-${Date.now()}`
        cy.get(".row-folder-create").within(() => {
            cy.get("[data-test='button-document']").click()
        })
        cy.wait(10000)

        cy.get("[data-test^='row-folder-']").within(() => {
            cy.get("input[type='text']")
                .clear()
                .type(newDocumentName)
        })
        cy.get("[data-test='document-body']").click()
        cy.wait(10000)
        cy.get("[data-test^='row-folder-'").contains(newDocumentName)
    })
})
