import { ApiResponse } from '@dataTypes/ApiRequest';
import { productsExample } from '@dataSets/Products';
import { testAccount } from '@dataSets/Accounts';
import AccountsHelper from '@helpers/Accounts';
import ObservedProductsHelper from '@helpers/ObservedProducts';

describe('Test of the ObservedProducts endpoit', () => {
  const accountsHelper = new AccountsHelper();
  const observedProductsHelper = new ObservedProductsHelper();

  before(() => {
    accountsHelper.getToken(testAccount).then((token: string) => {
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

  it('Should properly POST specific observed product', () => {
    cy.getLocalStorage('token').then((token) => {
      observedProductsHelper.postSpecificObservedProduct(
        productsExample.hotShotId,
        token
      );
    });
  });

  it('Should properly GET all observed product and save specific ID', () => {
    cy.getLocalStorage('token').then((token) => {
      observedProductsHelper
        .getAllObservedProducts(token)
        .then((body: ApiResponse['body']) => {
          const randomObservedProductId =
            observedProductsHelper.getRandomObservedProductId(body);
          cy.setLocalStorage('observedProductId', randomObservedProductId);
        });
    });
  });

  it('Should properly GET specific observed product', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('observedProductId').then((observedProductId) => {
        observedProductsHelper.getSpecificObservedProduct(
          observedProductId,
          token
        );
      });
    });
  });

  it('Should properly DELETE specific observed product', () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('observedProductId').then((observedProductId) => {
        observedProductsHelper.deleteSpecificObservedProduct(
          observedProductId,
          token
        );
      });
    });
  });
});
