import { ApiRequest, NumberParameter } from '@dataTypes/ApiRequest';

export function getInstallmentCalculation(
  totalVal: NumberParameter,
  prepaymentVal: NumberParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').payments_calculator,
    qs: {
      TotalValue: totalVal,
      PrePaymentValue: prepaymentVal,
    },
  };
}

export const getInstallmentSettings: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').payments_settings,
};
