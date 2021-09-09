class BasketsHelper {
  postEmptyBasketLogged = (token) => {
    if (token == null) {
      return cy
        .request({
          method: "POST",
          url: Cypress.env("BASE_URL") + Cypress.env("endpoints").baskets,
          headers: {
            "X-API-Key": Cypress.env("API_KEY"),
          },
          body: {},
        })
        .then((resp) => {
          expect(resp.status).equal(200);
          return resp.body.BasketToken;
        });
    }

    return cy
      .request({
        method: "POST",
        url: Cypress.env("BASE_URL") + Cypress.env("endpoints").baskets,
        headers: {
          "X-API-Key": Cypress.env("API_KEY"),
          Authorization: token,
        },
        body: {},
      })
      .then((resp) => {
        expect(resp.status).equal(200);
        return resp.body.BasketToken;
      });
  };

  putBasket = (productId, token) => {};
}

export default BasketsHelper;
