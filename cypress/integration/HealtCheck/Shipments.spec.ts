import { ApiResponse } from '@dataTypes/ApiRequest';
import { testAccount } from '@dataSets/Accounts';
import AccountsHelper from '@helpers/Accounts';
import OrdersHelper from '@helpers/Orders';
import ShipmentsHelper from '@helpers/Shipments';

describe('Test of the shipments endpoint', () => {
  const accountsHelper = new AccountsHelper();
  const ordersHelper = new OrdersHelper();
  const shipmentsHelper = new ShipmentsHelper();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  before(() => {
    accountsHelper.getToken(testAccount).then((token: string) => {
      ordersHelper
        .getAllUserOrders(token, 500)
        .then((body: ApiResponse['body']) => {
          const waybillNumbers = shipmentsHelper
            .getWaybillNumbersFromOrder(body)
            .join(',');
          cy.log(waybillNumbers);
          cy.setLocalStorage('waybillNumbers', waybillNumbers);
        });
    });
    cy.saveLocalStorage();
  });

  it('Should properly GET information about shipment by random waybillnumber', () => {
    cy.getLocalStorage('waybillNumbers').then((waybillNumbers) => {
      const wayBillNumbersArray = String(waybillNumbers).split(',');
      shipmentsHelper.getWaybillNumber(wayBillNumbersArray[2]);
    });
  });
});
