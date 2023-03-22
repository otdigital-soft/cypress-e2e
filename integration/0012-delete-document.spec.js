describe("Delete Document", () => {
    before(() => {
        cy.login("owner")
    })

    // OWNER => DOCUMENTS => CREATE => Upload
    it("Delete Document", () => {
        cy.get("[data-test='link-documents']").click()
        cy.get("[data-test='global-blocker']").click()

        cy.get("[data-test^='row-folder-']")
            .last()
            .within(() => {
                cy.get(".meta").click()

                cy.get("[data-test='row-document']", { timeout: 10000 })
                    .its("length")
                    .should("be.gte", 1)
                cy.get("[data-test='row-document']")
                    .last()
                    .within(() => {
                        cy.get(".delete-control", { force: true }).click({
                            force: true
                        })
                    })
            })
    })
})
