import {
  ApiRequest,
  StringParameter,
  NumberParameter,
} from '@dataTypes/ApiRequest';

export function getNews(paginationSize: NumberParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').news,
    qs: {
      'Pagination.PageSize': paginationSize,
    },
  };
}

export function getSpecificNews(newsId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').news + '/' + newsId,
  };
}

export function getSpecificNewsComments(newsId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').news + '/' + newsId,
  };
}
