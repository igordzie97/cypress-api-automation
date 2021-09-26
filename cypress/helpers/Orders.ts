import {
  getOrder,
  getLastOrder,
  getAllUserOrders,
  getAllUserClosedOrders,
} from '@controllerPaths/Orders';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class OrdersHelper {
  getOrder = (orderId: StringParameter, token: StringParameter): void => {
    cy.apiRequest(getOrder(orderId, token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(orderId);
    });
  };

  getLastOrder = (token: StringParameter): void => {
    cy.apiRequest(getLastOrder(token)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getAllUserOrders = (
    token: StringParameter,
    paginationPageSize = 10
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(getAllUserOrders(token, paginationPageSize))
      .then((resp) => {
        expect(resp.status).equal(200);
        expect(resp.body.Items.length).equal(paginationPageSize);

        return resp.body;
      });
  };

  getAllUserClosedOrders = (
    token: StringParameter,
    paginationPageSize = 10
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(getAllUserClosedOrders(token, paginationPageSize))
      .then((resp) => {
        expect(resp.status).equal(200);
        expect(resp.body.Items.length).equal(paginationPageSize);

        return resp.body;
      });
  };

  getRandomOrderId = (body: ApiResponse['body']): string => {
    const randomNumber = Math.floor((body.Items.length - 0) * Math.random());
    return body.Items[randomNumber].Id;
  };
}

export default OrdersHelper;
