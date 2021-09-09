class AccountHelper {
  createBearerToken = (token: string) => {
    return "Bearer " + token;
  };

  getToken = (username: string, password: string) => {
    return cy
      .request({
        method: "POST",
        url: Cypress.env("BASE_URL") + Cypress.env("endpoints").token,
        headers: {
          "X-API-Key": Cypress.env("API_KEY"),
        },
        form: true,
        body: {
          grant_type: "password",
          username: username,
          password: password,
        },
      })
      .then((resp) => {
        expect(resp.status).equal(200);
        return resp.body;
      });
  };

  checkAccount = (token: string, username: string) => {
    cy.request({
      method: "GET",
      url: Cypress.env("BASE_URL") + Cypress.env("endpoints").account,
      headers: {
        "X-API-Key": Cypress.env("API_KEY"),
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.AccountId).equal(username);
      return resp.body;
    });
  };

  getAccountBaskets = (token: string) => {
    cy.request({
      method: "GET",
      url: Cypress.env("BASE_URL") + Cypress.env("endpoints").account_baskets,
      headers: {
        "X-API-Key": Cypress.env("API_KEY"),
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).equal(200);
      return resp.body;
    });
  };
}

export default AccountHelper;
