describe("List Submittals", () => {
    describe("List Submittals with User", () => {
        before(() => {
            cy.login("user")
        })

        // User
        it("Should login, then list Submittal", () => {
            cy.list_projects()
            cy.list_submittal()
        })
    })
})
