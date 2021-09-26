import { ApiResponse } from '@dataTypes/ApiRequest';
import { ProductItem, Option } from '@dataTypes/Baskets';
import { testAccount } from '@dataSets/Accounts';
import { productsExample } from '@dataSets/Products';
import AccountHelper from '@helpers/Accounts';
import BasketsHelper from '@helpers/Baskets';

describe('Test of the Baskets endpoint', () => {
  const accountHelper = new AccountHelper();
  const basketsHelper = new BasketsHelper();

  before(() => {
    accountHelper.getToken(testAccount).then((token: string) => {
      cy.setLocalStorage('token', token);
    });
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should poperly POST plain basket', () => {
    cy.getLocalStorage(Cypress.env('token')).then((token) => {
      basketsHelper.postEmptyBasket(token).then((basketToken: string) => {
        cy.setLocalStorage('basketToken', basketToken);
      });
    });
  });

  it('Should properly PUT plain basket with hotShotID', () => {
    const productItems: ProductItem[] = [
      {
        ProductId: productsExample.hotShotId,
        Count: 1,
      },
    ];

    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.putBasket(basketToken, productItems, token);
      });
    });
  });

  it('Should properly PATCH basket with hotShotID and another products', () => {
    const productItems: ProductItem[] = [
      {
        ProductId: productsExample.basicId,
        Count: 1,
      },
      {
        ProductId: productsExample.hotShotId,
        Count: 1,
      },
    ];

    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.patchBasket(basketToken, productItems, token);
      });
    });
  });

  it('Should properly PUT basket products to count=2', () => {
    const productItems: ProductItem[] = [
      {
        ProductId: productsExample.basicId,
        Count: 2,
      },
      {
        ProductId: productsExample.hotShotId,
        Count: 2,
      },
    ];

    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper
          .putBasket(basketToken, productItems, token)
          .then((body: ApiResponse['body']) => {
            cy.setLocalStorage('firstProductPositionId', body.Items[0].Id);
          });
      });
    });
  });

  it('Should properly DELETE the second product of the basket', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        cy.getLocalStorage('firstProductPositionId').then(
          (firstProductPositionId) => {
            basketsHelper.deleteBasketItem(
              basketToken,
              firstProductPositionId,
              token
            );
          }
        );
      });
    });
  });

  it('Should properly GET basket barcode', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.getBasketBarcode(basketToken, token);
      });
    });
  });

  it('Should properly GET basket complementaryProducts', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.getBasketComplementaryProducts(basketToken, token);
      });
    });
  });

  it('Should properly GET basket options', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.getBasketOptions(basketToken, token);
      });
    });
  });

  it('Should properly POST basket options', () => {
    const optionItems: Option[] = [
      {
        AssignedProductId: [Number(productsExample.hotShotId)],
        Code: 'InterestedInInsurance',
      },
    ];

    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.postBasketOptions(basketToken, optionItems, token);
      });
    });
  });

  it('Should properly GET basket basicData', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.getBasketBasicData(basketToken, token);
      });
    });
  });

  it('Should properly GET basket', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.getBasket(basketToken, token);
      });
    });
  });

  it('Should properly DELETE basket', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('basketToken').then((basketToken) => {
        basketsHelper.deleteBasket(basketToken, token);
      });
    });
  });
});
