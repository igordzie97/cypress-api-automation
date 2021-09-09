import AccountHelper from "../../helpers/Accounts";
import HotShotsHelper from "../../helpers/HotShots";
import BasketsHelper from "../../helpers/Baskets";
import "cypress-localstorage-commands";

describe("Test of the Baskets endpoint", () => {
  const accountHelper = new AccountHelper();
  const hotShotsHelper = new HotShotsHelper();
  const basketsHelper = new BasketsHelper();
  const productId = 585489;

  before(() => {
    cy.fixture("user").then((user) => {
      accountHelper.getToken(user.username, user.password).then((body) => {
        cy.setLocalStorage(
          Cypress.env("storage_token"),
          accountHelper.createBearerToken(body.access_token)
        );
      });
    });

    hotShotsHelper.getCurrentHotShot().then((hotShotId) => {
      cy.setLocalStorage("hotshot_id", hotShotId);
    });

    cy.saveLocalStorage();
  });

  it("Should poperly POST plain basket", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage(Cypress.env("storage_token")).then((token) => {
      basketsHelper.postEmptyBasketLogged(token).then((basketToken) => {
        cy.setLocalStorage(Cypress.env("storage_basket_token"), basketToken);
      });
    });
    cy.saveLocalStorage();
  });

  it("Should properly PUT plain basket with hotShotID", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.getLocalStorage("hotshotID").then((hotshotID) => {
          cy.request({
            method: "PUT",
            url: urlApi + "/api/v1/xkom/Baskets/" + basketToken,
            headers: {
              "X-API-Key": API_KEY,
              Authorization: token,
            },
            body: {
              Items: [
                {
                  ProductId: hotshotID,
                  Count: 1,
                },
              ],
            },
          }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.Items[0].ProductId).equal(hotshotID);
          });
        });
      });
    });
  });

  it("Should properly PATCH basket with hotShotID and another products", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.getLocalStorage("hotshotID").then((hotshotID) => {
          cy.request({
            method: "PATCH",
            url: urlApi + "/api/v1/xkom/Baskets/" + basketToken,
            headers: {
              "X-API-Key": API_KEY,
              Authorization: token,
            },
            body: {
              Items: [
                {
                  ProductId: hotshotID,
                  Count: 1,
                },
                {
                  ProductId: secondProduct,
                  Count: 1,
                },
              ],
            },
          }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.Items[0].ProductId).equal(secondProduct + "");
            expect(response.body.Items[1].ProductId).equal(hotshotID);
          });
        });
      });
    });
  });

  it("Should properly PUT basket products to count=2", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.getLocalStorage("hotshotID").then((hotshotID) => {
          cy.request({
            method: "PUT",
            url: urlApi + "/api/v1/xkom/Baskets/" + basketToken,
            headers: {
              "X-API-Key": API_KEY,
              Authorization: token,
            },
            body: {
              Items: [
                {
                  ProductId: hotshotID,
                  Count: 2,
                },
                {
                  ProductId: secondProduct,
                  Count: 2,
                },
              ],
            },
          }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.Items[0].ProductId).equal(secondProduct + "");
            expect(response.body.Items[1].ProductId).equal(hotshotID);
            expect(response.body.Items[0].Count).equal(2);
            expect(response.body.Items[0].Count).equal(2);
            cy.setLocalStorage(
              "secondProductPosition",
              response.body.Items[0].Id
            );
            cy.saveLocalStorage();
          });
        });
      });
    });
  });

  it("Should properly DELETE the second product of the basket", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.getLocalStorage("secondProductPosition").then(
          (secondProductPositionID) => {
            cy.request({
              method: "DELETE",
              url:
                urlApi +
                "/api/v1/xkom/Baskets/" +
                basketToken +
                "/Items/" +
                secondProductPositionID,
              headers: {
                "X-API-Key": API_KEY,
                Authorization: token,
              },
            }).then((response) => {
              expect(response.status).equal(200);
            });
          }
        );
      });
    });
  });

  it("Should properly GET basket barcode", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "GET",
          url: urlApi + "/api/v1/xkom/Baskets/" + basketToken + "/Barcode",
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.PlainData).equal(basketToken);
        });
      });
    });
  });

  it("Should properly GET basket complementaryProducts", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "GET",
          url:
            urlApi +
            "/api/v1/xkom/Baskets/" +
            basketToken +
            "/ComplementaryProducts",
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
          qs: {
            limit: 15,
          },
        }).then((response) => {
          expect(response.status).equal(200);
        });
      });
    });
  });

  it("Should properly GET basket options", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "GET",
          url: urlApi + "/api/v1/xkom/Baskets/" + basketToken + "/Options",
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
        }).then((response) => {
          expect(response.status).equal(200);
        });
      });
    });
  });

  it("Should properly POST basket options", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "POST",
          url: urlApi + "/api/v1/xkom/Baskets/" + basketToken + "/Options",
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
          body: [
            {
              Code: "InterestedInInsurance",
              AssignedProductId: [396852],
            },
          ],
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.SelectedOptions[0].Code).equal(
            "InterestedInInsurance"
          );
        });
      });
    });
  });

  it("Should properly GET basket basicData", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "GET",
          url: urlApi + "/api/v1/xkom/Baskets/" + basketToken + "/BasicData",
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.BasketToken).equal(basketToken);
        });
      });
    });
  });

  it("Should properly GET basket", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "GET",
          url: urlApi + "/api/v1/xkom/Baskets/" + basketToken,
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.BasketToken).equal(basketToken);
        });
      });
    });
  });

  it("Should properly DELETE basket", () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage("access_token").then((token) => {
      cy.getLocalStorage("basketToken").then((basketToken) => {
        cy.request({
          method: "DELETE",
          url: urlApi + "/api/v1/xkom/Baskets/" + basketToken,
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token,
          },
        }).then((response) => {
          expect(response.status).equal(200);
        });
      });
    });
  });
});
