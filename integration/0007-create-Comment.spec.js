describe("Create comment (with and without attachment)", () => {
    before(() => {
        cy.login("owner")
    })

    //FIRST CREATE A NEW TICKET
    // OWNER => Create New Ticket
    it("Should login, then list Rfi, create New", () => {
        cy.wait(20000)
        cy.get("[data-test='link-rfi']").click()
        cy.global_blocker_click()

        const current_time = Date.now()

        cy.wait(3000)

        cy.get("[data-test='rfi-ticket-body']", { timeout: 30000 })
            .its("length")
            .should("be.gte", 1)

        cy.get("[data-test='rfi-ticket-body']")
            .children()
            .not(".is-closed")
            .last()
            .click()

        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='textarea-input']").within(() => {
                const comment = `NEW TEST COMMENT? - ${current_time}`
                cy.get("textarea")
                    .clear()
                    .type(`${comment}{enter}`)
                cy.get("textarea").should("have.value", `${comment}\n`)
                cy.get("[data-test='textarea-submit']").click()
            })
        })

        cy.wait(3000)

        cy.get("[data-test='comment-section']").within(() => {
            cy.get("[data-test='comment-update-logs']")
                .last()
                .within(() => {
                    cy.contains("NEW TEST COMMENT?")
                })
        })

        // Create a new comment and attempt to upload a file, check for uppy UI

        cy.wait(3000)

        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='textarea-input']").within(() => {
                cy.get("textarea")
                    .clear()
                    .type("NEW TEST COMMENT WITH ATTACHMENT{enter}")
                cy.get("textarea").should(
                    "have.value",
                    "NEW TEST COMMENT WITH ATTACHMENT\n"
                )
                cy.get("[data-test='textarea-fileupload']").click()
            })
        })

        cy.wait(3000)
        const attachedFileName = `new-atachment-${Date.now()}?`

        cy.uppy_upload_file("testfile.json", attachedFileName)

        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='section-attachments']").contains(
                attachedFileName
            )
        })

        // Submit Empty Ticket
        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        // cy.get("[data-test='global-notification']").should('have.length', 4)

        cy.wait(5000)

        // Try Adding ASSIGNEE
        cy.get("[data-test='assignee-input']").within(() => {
            cy.get("[data-test='empty-input']").click()
            cy.get("[data-test='select-item-0']").click()
            cy.get(".initials").then(($initial) => {
                const text = $initial.text()
                expect(text).to.eq("TO")
            })
        })

        // Submit Ticket with Just ASSIGNEE
        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        // cy.get("[data-test='global-notification']").should('have.length', 3)

        cy.wait(5000)

        // ADD REQUIRED DUE DATE
        cy.get("[data-test='required-due-date-input'").within(() => {
            cy.get("[data-test='date-input']")
                .clear()
                .type("2022-07-15")
            cy.get("[data-test='date-input']").should(
                "have.value",
                "2022-07-15"
            )
        })

        // Submit Ticket with Just ASSIGNEE + REQUIRED DUE DATE
        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        // cy.get("[data-test='global-notification']").should('have.length', 2)

        cy.wait(5000)

        // ADD CONTRACTUAL DUE DATE
        cy.get("[data-test='contractual-due-date-input'").within(() => {
            cy.get("[data-test='date-input']")
                .clear()
                .type("2022-07-18")
            cy.get("[data-test='date-input']").should(
                "have.value",
                "2022-07-18"
            )
        })

        // Submit Ticket with Just ASSIGNEE + REQUIRED DUE DATE + CONTRACTUAL DUE DATE
        cy.get("[data-test='comment-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        // cy.get("[data-test='global-notification']").should('have.length', 1)

        cy.wait(5000)

        // ADD QUESTION AND SUBMIT TICKET WITH ALL REQUIRED FIELDS
        cy.get("[data-test='comment-input']").within(() => {
            cy.get("textarea")
                .clear()
                .type("NEW TEST Question ?{enter}")
            cy.get("textarea").should("have.value", "NEW TEST Question ?\n")
            cy.get("[data-test='textarea-submit']").click()
        })

        cy.wait(5000)

        cy.get("[data-test='rfi-ticket-body']")
            .first()
            .within(() => {
                cy.contains("Test Owner")
                cy.contains("N/A")
            })
    })
})
