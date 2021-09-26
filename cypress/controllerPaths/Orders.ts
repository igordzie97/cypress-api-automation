import {
  ApiRequest,
  StringParameter,
  NumberParameter,
} from '@dataTypes/ApiRequest';

export function getOrder(
  orderId: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').orders + '/' + orderId,
    authHeader: token,
  };
}

export function getLastOrder(token: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').orders_last,
    authHeader: token,
  };
}

export function getAllUserOrders(
  token: StringParameter,
  paginationPageSize: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').orders,
    authHeader: token,
    qs: {
      'Pagination.PageSize': paginationPageSize,
    },
  };
}

export function getAllUserClosedOrders(
  token: StringParameter,
  paginationPageSize: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').orders,
    authHeader: token,
    qs: {
      'Criteria.StatusIds': 'Closed',
      'Pagination.PageSize': paginationPageSize,
    },
  };
}
