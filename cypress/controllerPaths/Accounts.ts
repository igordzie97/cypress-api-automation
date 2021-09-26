import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';
import { AccountAuth } from '@dataTypes/Accounts';

export function getTokenRequest(account: AccountAuth): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('endpoints').token,
    form: true,
    body: {
      grant_type: 'password',
      username: account.email,
      password: account.password,
    },
  };
}

export function getAccountRequest(token: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').account,
    authHeader: token,
  };
}

export function getAccountBasketsRequest(token: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').account_baskets,
    authHeader: token,
  };
}
