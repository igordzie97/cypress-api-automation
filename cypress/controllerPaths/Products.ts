import {
  ApiRequest,
  StringParameter,
  NumberParameter,
} from '@dataTypes/ApiRequest';
import { ProductComment } from '@dataTypes/Products';

export function getSpecificProduct(productId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').products + '/' + productId,
  };
}

export function getProductsWithProducer(
  producerId: StringParameter,
  paginationPageSize: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').products,
    qs: {
      'Criteria.ProducerIds': producerId,
      'Pagination.PageSize': paginationPageSize,
    },
  };
}

export function getProductsWithText(
  searchText: StringParameter,
  paginationPageSize: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').products,
    qs: {
      'Criteria.SearchText': searchText,
      'Pagination.PageSize': paginationPageSize,
    },
  };
}

export function getProductSearchHints(
  searchText: StringParameter,
  paginationPageSize: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').products_search_hints,
    qs: {
      text: searchText,
      limit: paginationPageSize,
    },
  };
}

export function getCompareProducts(productsIds: StringParameter[]): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').products_compare,
    qs: {
      productsIds: productsIds.join(','),
    },
  };
}

export function postProductComment(
  productId: StringParameter,
  productComment: ProductComment,
  token: StringParameter
): ApiRequest {
  return {
    method: 'POST',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      '/' +
      Cypress.env('endpoints').comments,
    authHeader: token,
    body: productComment,
  };
}

export function postProductCommentVote(
  productId: StringParameter,
  commentId: StringParameter,
  token: StringParameter
): ApiRequest {
  return {
    method: 'POST',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      Cypress.env('endpoints').comments +
      '/' +
      commentId +
      Cypress.env('endpoints').votes,
    authHeader: token,
  };
}

export function getProductDepartmentAvailability(
  productId: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      Cypress.env('endpoints').departments_av,
  };
}

export function getProductOnlineAvailability(
  productId: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      Cypress.env('endpoints').online_av,
  };
}

export function getUserCommentAvailability(
  productId: StringParameter,
  token?: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      Cypress.env('endpoints').comment_status,
    authHeader: token,
  };
}

export function getProductComments(productId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      Cypress.env('endpoints').comments,
  };
}

export function getProductBringingStatus(
  productId: StringParameter,
  postCode: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').products +
      '/' +
      productId +
      Cypress.env('endpoints').bring_service,
    qs: {
      PostCode: postCode,
    },
  };
}
