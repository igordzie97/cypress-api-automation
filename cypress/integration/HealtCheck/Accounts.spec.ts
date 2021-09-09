import AccountHelper from "../../helpers/Accounts";

describe("Test of Account endpoint", () => {
  const accountHelper = new AccountHelper();

  it("should GET Bearer token with given username and password", () => {
    cy.fixture("user").then((user) => {
      accountHelper.getToken(user.username, user.password).then((body) => {
        cy.setLocalStorage(
          Cypress.env("storage_token"),
          accountHelper.createBearerToken(body.access_token)
        );
      });
    });
    cy.saveLocalStorage();
  });

  it("should GET information about account with given Bearer token", () => {
    cy.restoreLocalStorage();

    cy.getLocalStorage(Cypress.env("storage_token")).then((token) => {
      cy.fixture("user").then((user) => {
        accountHelper.checkAccount(token, user.username);
      });
    });
  });

  it("should properly GET Account baskets with given Bearer token", () => {
    cy.restoreLocalStorage();

    cy.getLocalStorage(Cypress.env("storage_token")).then((token) => {
      accountHelper.getAccountBaskets(token);
    });
  });
});
