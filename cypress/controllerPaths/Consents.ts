import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export function getConsents(context: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').consents,
    qs: {
      consentContextCode: context,
    },
  };
}
