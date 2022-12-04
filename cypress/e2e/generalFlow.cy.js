// <reference types="cypress" />;

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("check app", () => {
  beforeEach(() => {
    // cy.visit('https://vocba-learner.vercel.app/vocab')
    cy.visit("localhost:3000");
  });

  it("check all important flows", () => {
    // add and remove card
    cy.get("[data-cy='english']").find("input").type("cat", { force: true });
    cy.get("[data-cy='spanish']").find("input").type("gato", { force: true });
    cy.get("[data-cy='submit']").contains("Add").click();
    cy.reload();
    cy.get("[data-cy='delete-cat']").contains("delete").click();

    // check if first vocab can be learned in learn page
    cy.get("[data-cy='spanish-question']").then((text) => {
      const answer = text[0].outerText;
      console.log("check", answer);

      // correct case
      cy.visit("localhost:3000/learn");
      cy.get("[data-cy='answer-input']")
        .find("input")
        .type(answer, { force: true });
      cy.get("[data-cy='submit']").contains("Submit").click();
      cy.get("[data-cy='correct']").should("exist");

      // wrong case
      cy.get("[data-cy='next-question']").contains("Next Question").click();
      cy.get("[data-cy='answer-input']")
        .find("input")
        .type("foo", { force: true });
      cy.get("[data-cy='submit']").contains("Submit").click();
      cy.get("[data-cy='false']").should("exist");
    });
  });
});
