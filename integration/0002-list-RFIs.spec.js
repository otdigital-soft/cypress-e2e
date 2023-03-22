describe("List RFIs", () => {
    describe("List RFIs with User", () => {
        before(() => {
            cy.login("user")
        })

        // User
        it("Should login, then list Rfi", () => {
            cy.list_projects()
            cy.list_rfis()
        })
    })
})
