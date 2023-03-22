describe("Create Submittal (all permutations)", () => {
    before(() => {
        cy.login("owner")
    })
    //FIRST CREATE A NEW TICKET
    // OWNER => Create New Ticket
    it("Should login, then list Submittal, create New", () => {
        cy.list_submittal()

        cy.global_blocker_click()
        cy.wait(10000)

        cy.get("[data-test='create-ticket']").click({ force: true })

        // PICK SPEC SECTION
        cy.get("[data-test='spec-section-select']").within(() => {
            cy.get("[data-test='default-item']").click()
            cy.get("[data-test='dropdown-list']").within(() => {
                cy.get("[data-test='select-item-0']").click()
            })
        })

        // ADD SPEC NUMBER
        cy.get("[data-test='spec-section-number-input']").click()
        cy.get("[data-test='spec-section-number-input']").within(() => {
            cy.get("input[type='text']")
                .clear()
                .type("9877")
            cy.get("input[type='text']").should("have.value", "9877")
        })

        // ADD ASSIGNEE
        cy.get("[data-test='assignee-input']").within(() => {
            cy.get("[data-test='empty-input']").click()
            cy.get("[data-test='select-item-0']").click()
            cy.get(".initials").then($initial => {
                const text = $initial.text()
                expect(text).to.eq("TO")
            })
        })

        // ADD COLLABORATOR
        cy.get("[data-test='collaborators-input']").within(() => {
            cy.get("[data-test='empty-input']").click()
            cy.get("[data-test='select-item-0']").click()
            cy.get(".initials").then($initial => {
                const text = $initial.text()
                expect(text).to.eq("TO")
            })
        })

        // ADD PRIORITY
        cy.get("[data-test='priority-input']").click()
        cy.get("[data-test='priority-input']").within(() => {
            cy.get("[data-test='option-0']").click()
            cy.get("[data-test='option-0']").should("have.class", "is-selected")
            cy.get("[data-test='option-0']").click()
            cy.get("[data-test='option-2']").click()
            cy.get("[data-test='option-2']").should("have.class", "is-selected")
            cy.get("[data-test='option-2']").click()
            cy.get("[data-test='option-1']").click()
            cy.get("[data-test='option-1']").should("have.class", "is-selected")
        })

        // ADD STATUS
        cy.get("[data-test='status-input']").click()
        cy.get("[data-test='status-input']").within(() => {
            cy.get("[data-test='option-0']").click()
            cy.get("[data-test='option-0']").should("have.class", "is-selected")
            cy.get("[data-test='option-0']").click()
            cy.get("[data-test='option-1']").click()
            cy.get("[data-test='option-1']").should("have.class", "is-selected")
        })

        // ADD DISCIPLINES
        cy.get("[data-test='disciplines-input']").within(() => {
            cy.get("[data-test='empty-input']").click()
            cy.get("[data-test='select-item-3']").click()
            cy.get("[data-test='selected-item-0']").should(
                "have.text",
                "Civil Engineer  "
            )
        })

        // ADD DATES: REQUIRED AND CONTRACTUAL
        cy.get("[data-test='required-due-date-input'").within(() => {
            cy.get("[data-test='date-input']")
                .clear()
                .type("2022-07-15")
            cy.get("[data-test='date-input']").should(
                "have.value",
                "2022-07-15"
            )
        })

        cy.get("[data-test='contractual-due-date-input'").within(() => {
            cy.get("[data-test='date-input']")
                .clear()
                .type("2022-07-18")
            cy.get("[data-test='date-input']").should(
                "have.value",
                "2022-07-18"
            )
        })

        // ADD SUBJECT
        cy.get("[data-test='ticket-subject']").click()
        cy.get("[data-test='ticket-subject']").within(() => {
            cy.get("input[type='text']")
                .clear()
                .type("NEW TEST SUBJECT")
            cy.get("input[type='text']").should(
                "have.value",
                "NEW TEST SUBJECT"
            )
        })

        // ADD QUESTION
        cy.get("[data-test='question-input']").within(() => {
            cy.get("textarea")
                .clear()
                .type("NEW TEST Question ?{enter}")
            cy.get("textarea").should("have.value", "NEW TEST Question ?\n")
            cy.get("[data-test='textarea-submit']").click()
        })

        cy.wait(5000)

        cy.get("[data-test^='ticket-']")
            .first()
            .click()
        cy.get("[data-test^='ticket-']")
            .its("length")
            .should("be.gte", 1)

        cy.wait(3000)

        cy.get(".tickets").within(() => {
            cy.contains("NEW TEST SUBJECT")
            cy.contains("9877")
        })
    })
})
