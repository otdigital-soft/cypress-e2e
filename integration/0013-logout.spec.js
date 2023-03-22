describe("Logout", () => {
    before(() => {
        cy.login("owner")
    })

    // OWNER => RENAME FOLDER => DELETE FOLDER
    it("Logout", () => {
        cy.get("[data-test='global-blocker']", { timeout: 30000 }).click()
        cy.wait(3000)
        cy.get("[data-test=header-logout]").click()
        cy.wait(3000)

        cy.get("[data-test=email] > .input")
            .its("length")
            .should("eq", 1)

        cy.get("[data-test=password] > .input")
            .its("length")
            .should("eq", 1)

        cy.get("[data-test=submit]")
            .its("length")
            .should("eq", 1)
    })
})
