// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (userType, options = {}) => {
    const types = {
        // Org Owner test account
        owner: {
            email: "test-owner@polarisprojects.com",
            password: Cypress.env("user_password")
        },
        // Org Admin test account
        admin: {
            email: "test-admin@polarisprojects.com",
            password: Cypress.env("user_password")
        },
        // User test account here
        user: {
            email: "test-user@polarisprojects.com",
            password: Cypress.env("user_password")
        }
    }

    // Set user type and attempt login
    const user = types[userType]
    cy.visit("/login")
    cy.get("[data-test='email']").type(user.email)
    cy.get("[data-test='password']").type(user.password)
    cy.get("[data-test='submit']").click()
    cy.wait(10000)
})

// list project
Cypress.Commands.add("list_projects", () => {
    cy.get("[data-test='organizations']").within(() => {
        cy.get("[data-test^='organization-item-']", { timeout: 3000 })
            .its("length")
            .should("be.gte", 1)

        cy.get("[data-test^='organization-item-']").within(() => {
            cy.get("[data-test='project-items']").within(() => {
                cy.get("[data-test^='project-item-']", { timeout: 3000 })
                    .its("length")
                    .should("be.gte", 1)
            })
        })
    })
})

// list rfis
Cypress.Commands.add("list_rfis", () => {
    cy.wait(20000)
    cy.get("[data-test='link-rfi']").click()
    cy.wait(3000)

    // check to "create ticket"
    cy.get("[data-test='create-ticket']", { timeout: 30000 })
        .its("length")
        .should("eq", 1)

    // check to "ticket body"
    cy.get("[data-test='rfi-ticket-body']", { timeout: 30000 })
        .its("length")
        .should("be.gte", 1)
    // cy.get("[data-test='global-blocker'", { force: true }).click();
})

// list Document
Cypress.Commands.add("list_documents", () => {
    cy.wait(30000)
    cy.get("[data-test='link-documents']").click()
    cy.wait(3000)
    // check to "create ticket"
    cy.get("[data-test='button-document']", { timeout: 30000 })
        .its("length")
        .should("eq", 1)

    // check to "ticket body"
    cy.get("[data-test='document-body']", { timeout: 30000 })
        .its("length")
        .should("be.gte", 1)
})

// list Submittals
Cypress.Commands.add("list_submittal", () => {
    cy.get("[data-test='link-submittal']").click()
    cy.wait(10000)
    // check to "create ticket"
    cy.get("[data-test='create-ticket']", { timeout: 30000 })
        .its("length")
        .should("eq", 1)

    // check to "ticket body"
    cy.get("[data-test='submittal-ticket-body']", { timeout: 30000 })
        .its("length")
        .should("be.gte", 1)
})

Cypress.Commands.add("uppy_upload_file", (sourcePath, fileName) => {
    // file upload here
    cy.get(".uppy-Root", { timeout: 30000 }).within(() => {
        cy.get(".uppy-Dashboard").within(() => {
            cy.get(".uppy-Dashboard-inner").within(() => {
                cy.get(".uppy-Dashboard-AddFiles-list").within(() => {
                    cy.get(".uppy-DashboardTab")
                        .first()
                        .within(() => {
                            cy.contains("My Device")
                        })
                })

                cy.get(".uppy-Dashboard-input")
                    .first()
                    .attachFile(
                        { filePath: sourcePath, fileName },
                        { subjectType: "input" }
                    )
            })
        })
    })

    cy.wait(10000)
})

Cypress.Commands.add("global_blocker_click", () => {
    cy.wait(20000)
    cy.get("body").then((body) => {
        const len = body.find("[data-test='global-blocker']").length
        if (len > 0) {
            cy.get("[data-test='global-blocker']").click()
        }
    })

    cy.wait(3000)
})
