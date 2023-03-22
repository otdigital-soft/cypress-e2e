describe("Create RFI (all permutations - some fields, no fields, with attachment etc...)", () => {
    before(() => {
        cy.login("owner")
    })

    //FIRST CREATE A NEW TICKET
    // OWNER => Create New Ticket
    it("Should login, create New With Check Empty fields", () => {
        cy.list_rfis()
        cy.global_blocker_click()

        cy.get("[data-test='create-ticket']").click({ force: true })

        // Submit Empty Ticket
        cy.get("[data-test='question-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        cy.get("[data-test='global-notification']").should("have.length", 4)

        cy.wait(5000)

        // Try Adding ASSIGNEE
        cy.get("[data-test='assignee-input']").within(() => {
            cy.get("[data-test='empty-input']").click()
            cy.get("[data-test='select-item-0']").click()
            cy.get(".initials").then($initial => {
                const text = $initial.text()
                expect(text).to.eq("TO")
            })
        })

        // Submit Ticket with Just ASSIGNEE
        cy.get("[data-test='question-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        cy.get("[data-test='global-notification']").should("have.length", 3)

        cy.wait(5000)

        // ADD REQUIRED DUE DATE
        cy.get("[data-test='required-due-date-input'").within(() => {
            cy.get("[data-test='date-input']")
                .clear()
                .type("2022-09-10")
            cy.get("[data-test='date-input']").should(
                "have.value",
                "2022-09-10"
            )
        })

        // Submit Ticket with Just ASSIGNEE + REQUIRED DUE DATE
        cy.get("[data-test='question-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        cy.get("[data-test='global-notification']").should("have.length", 2)

        cy.wait(5000)

        // ADD CONTRACTUAL DUE DATE
        cy.get("[data-test='contractual-due-date-input'").within(() => {
            cy.get("[data-test='date-input']")
                .clear()
                .type("2022-09-18")
            cy.get("[data-test='date-input']").should(
                "have.value",
                "2022-09-18"
            )
        })

        // Submit Ticket with Just ASSIGNEE + REQUIRED DUE DATE + CONTRACTUAL DUE DATE
        cy.get("[data-test='question-input']").within(() => {
            cy.get("[data-test='textarea-submit']").click()
        })

        cy.get("[data-test='global-notification']").should("have.length", 1)

        cy.wait(5000)

        // ADD QUESTION AND SUBMIT TICKET WITH ALL REQUIRED FIELDS
        const question = `NEW TEST Question ${Date.now()}?`
        const attachedFileName = `new-atachment-${Date.now()}?`

        cy.get("[data-test='question-input']").within(() => {
            cy.get("textarea")
                .clear()
                .type(`${question}{enter}`)
            cy.get("[data-test='textarea-fileupload']").click()
        })
        cy.wait(3000)
        cy.uppy_upload_file("testfile.json", attachedFileName)

        cy.get("[data-test='question-input']").within(() => {
            cy.get("textarea").should("have.value", `${question}\n`)
            cy.get("[data-test=section-attachments]").contains(attachedFileName)
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
