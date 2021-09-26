import { ApiRequest } from '@dataTypes/ApiRequest';

export const getGlobalParametersRequest: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').global_param,
};
