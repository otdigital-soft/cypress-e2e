describe("Upload Document", () => {
    before(() => {
        cy.login("owner")
    })

    // OWNER => DOCUMENTS => LAST => UPLOAD DOCUMENT
    it("Upload Document", () => {
        cy.get("[data-test='link-documents']").click()
        cy.global_blocker_click()

        const fileName = `document-upload-test-${Date.now()}.json`

        // FIX THIS to test for # of tickets
        cy.get("[data-test='document-body']").within(() => {
            cy.get(".row-document-folder")
                .its("length")
                .should("be.gte", 1)

            cy.get("[data-test^='row-folder-']")
                .last()
                .within(() => {
                    cy.get("[data-test='file-input']", { force: true }).click({
                        force: true
                    })
                })
        })

        cy.wait(3000)

        cy.uppy_upload_file("testfile.json", fileName)

        cy.get("[data-test^='row-folder-']")
            .last()
            .within(() => {
                cy.get(".meta").click({ force: true })
                cy.wait(3000)
                cy.get("[data-test='row-document']").contains(fileName)
                cy.get("[data-test='row-document']").contains("Test Owner")
            })
    })
})
