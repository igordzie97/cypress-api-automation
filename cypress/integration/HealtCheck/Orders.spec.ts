import { ApiResponse } from '@dataTypes/ApiRequest';
import { testAccount } from '@dataSets/Accounts';
import AccountsHelper from '@helpers/Accounts';
import OrdersHelper from '@helpers/Orders';

describe('Orders endpoint', () => {
  const accountsHelper = new AccountsHelper();
  const ordersHelper = new OrdersHelper();

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

  it('Should properly GET Orders of logged user', () => {
    cy.getLocalStorage('token').then((token) => {
      ordersHelper.getAllUserOrders(token).then((body: ApiResponse['body']) => {
        const randomOrderId = ordersHelper.getRandomOrderId(body);
        cy.setLocalStorage('orderId', randomOrderId);
      });
    });
  });

  it('Should properly GET last order', () => {
    cy.getLocalStorage('token').then((token) => {
      ordersHelper.getLastOrder(token);
    });
  });

  it('Should GET specific Order', () => {
    cy.getLocalStorage('token').then((token) => {
      cy.getLocalStorage('orderId').then((orderId) => {
        ordersHelper.getOrder(orderId, token);
      });
    });
  });
});
