describe("Smoke", () => {
    it("Logo should be visible", () => {
        cy.visit("/login")
        cy.get("[data-test='logo']").should("be.visible")
        cy.screenshot()
    })
})
