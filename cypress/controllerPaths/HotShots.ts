import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export const getCurrentHotShot: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').hotshots_current,
};

export function getHotShotPurchaes(hotShotId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url:
      Cypress.env('endpoints').hotshots +
      '/' +
      hotShotId +
      Cypress.env('endpoints').purchase_offer,
  };
}
