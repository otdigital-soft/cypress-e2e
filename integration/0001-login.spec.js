describe("Login", () => {
    it("Should not allow login", () => {
        cy.visit("/login")
        cy.get("[data-test='email']").type("user-invaild@polarisprojects.com")
        cy.get("[data-test='password']").type("bad-password")
        cy.get("[data-test='submit']").click()
        cy.get("[data-test='error']").should("be.visible")
    })

    it("Owner: Should allow succesfull login", () => {
        cy.login("owner")
        cy.get("[data-test='organization-0']", { timeout: 30000 }).should(
            "be.visible"
        )
    })

    it("Admin: Should allow succesfull login", () => {
        cy.login("admin")
        cy.get("[data-test='settings']", { timeout: 30000 }).should(
            "be.visible"
        )
    })

    it("User: Should allow succesfull login", () => {
        cy.login("user")
        cy.get("[data-test='panel-projects']", { timeout: 30000 }).should(
            "be.visible"
        )
    })
})
