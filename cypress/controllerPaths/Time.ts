import { ApiRequest } from '@dataTypes/ApiRequest';

export const getCurrentTimeRequest: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').time,
};
