import {
  ApiRequest,
  StringParameter,
  NumberParameter,
} from '@dataTypes/ApiRequest';
import { ProductItem, Option } from '@dataTypes/Baskets';

export function getBasket(
  basketToken: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').baskets + '/' + basketToken,
    authHeader: token,
  };
}

export function getBasketBasicData(
  basketToken: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').baskets +
      '/' +
      basketToken +
      Cypress.env('endpoints').basket_basic_data,
    authHeader: token,
  };
}

export function postEmptyBasket(token: StringParameter): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('endpoints').baskets,
    authHeader: token,
    body: {},
  };
}

export function postBasket(
  products: ProductItem[],
  token: StringParameter
): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('endpoints').baskets,
    authHeader: token,
    body: { Items: products },
  };
}

export function putBasket(
  basketToken: StringParameter,
  products: ProductItem[],
  token: StringParameter
): ApiRequest {
  return {
    method: 'PUT',
    url: Cypress.env('endpoints').baskets + '/' + basketToken,
    authHeader: token,
    body: {
      Items: products,
    },
  };
}

export function patchBasket(
  basketToken: StringParameter,
  products: ProductItem[],
  token: StringParameter
): ApiRequest {
  return {
    method: 'PATCH',
    url: Cypress.env('endpoints').baskets + '/' + basketToken,
    authHeader: token,
    body: {
      Items: products,
    },
  };
}

export function deleteBasket(
  basketToken: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'DELETE',
    url: Cypress.env('endpoints').baskets + '/' + basketToken,
    authHeader: token,
  };
}

export function deleteBasketItem(
  basketToken: StringParameter,
  productPositionId: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'DELETE',
    url:
      Cypress.env('endpoints').baskets +
      '/' +
      basketToken +
      Cypress.env('endpoints').basket_item +
      '/' +
      productPositionId,
    authHeader: token,
  };
}

export function getBasketBarcode(
  basketToken: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').baskets +
      '/' +
      basketToken +
      Cypress.env('endpoints').basket_barcode,
    authHeader: token,
  };
}

export function getBasketComplementaryProducts(
  basketToken: StringParameter,
  token: StringParameter,
  limit: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').baskets +
      '/' +
      basketToken +
      Cypress.env('endpoints').basket_complementary_products,
    authHeader: token,
    qs: {
      limit: limit,
    },
  };
}

export function getBasketOptions(
  basketToken: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').baskets +
      '/' +
      basketToken +
      Cypress.env('endpoints').basket_options,
    authHeader: token,
  };
}

export function postBasketOptions(
  basketToken: StringParameter,
  options: Option[],
  token: StringParameter
): ApiRequest {
  return {
    method: 'POST',
    url:
      Cypress.env('endpoints').baskets +
      '/' +
      basketToken +
      Cypress.env('endpoints').basket_options,
    authHeader: token,
    body: options,
  };
}
