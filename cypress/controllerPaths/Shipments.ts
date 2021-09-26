import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export function getWaybillNumber(waybillNumber: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').shipments + '/' + waybillNumber,
  };
}
