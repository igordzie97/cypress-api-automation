import { ApiRequest } from '@dataTypes/ApiRequest';

export const getDiagnosticsRequest: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').diagnostics,
};
