describe("Update Document", () => {
    before(() => {
        cy.login("owner")
    })

    // OWNER => DOCUMENTS => CREATE => Upload
    it("Update the version of Document", () => {
        cy.get("[data-test='link-documents']").click()
        cy.global_blocker_click()

        cy.wait(3000)

        const fileName = `document-update-version-${Date.now()}.json`

        cy.get("[data-test^='row-folder-']")
            .last()
            .within(() => {
                cy.get(".meta").click()
                cy.wait(3000)
                cy.get("[data-test='row-document']")
                    .last()
                    .within(() => {
                        cy.get("[data-test='document-history-btn']").click({
                            force: true
                        })
                    })
            })
        cy.wait(30000)
        cy.get(".upload-button", { timeout: 10000 }).click()
        cy.wait(1000)

        cy.uppy_upload_file("testfile.json", fileName)
        cy.get("[data-test='row-document']").contains(fileName)
        cy.get("[data-test='row-document']").contains("Test Owner")
    })
})
