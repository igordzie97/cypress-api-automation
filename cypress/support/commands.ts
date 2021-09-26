import { ApiRequest } from '../dataTypes/ApiRequest';
import 'cypress-localstorage-commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      apiRequest(request: ApiRequest): Chainable<Response<any>>;
    }
  }
}

Cypress.Commands.add('apiRequest', (request: ApiRequest) => {
  let token = '';

  if (request.authHeader != null) {
    token = 'Bearer ' + request.authHeader;
  }

  return cy.request({
    method: request.method,
    url: Cypress.env('BASE_URL') + request.url,
    headers: {
      'X-API-Key': Cypress.env('API_KEY'),
      Authorization: token,
    },
    body: request.body,
    form: request.form,
    qs: request.qs,
  });
});

export {};
