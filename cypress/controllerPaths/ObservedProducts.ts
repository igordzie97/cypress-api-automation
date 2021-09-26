import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export function getAllObservedProducts(token: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').observed_products,
    authHeader: token,
  };
}

export function getObservedProduct(
  productId: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').observed_products + '/' + productId,
    authHeader: token,
  };
}

export function postObservedProduct(
  productId: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('endpoints').observed_products,
    authHeader: token,
    qs: {
      productId: productId,
    },
  };
}

export function deleteObservedProduct(
  productId: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'DELETE',
    url: Cypress.env('endpoints').observed_products + '/' + productId,
    authHeader: token,
  };
}
