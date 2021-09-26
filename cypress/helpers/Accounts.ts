import {
  getTokenRequest,
  getAccountRequest,
  getAccountBasketsRequest,
} from '@controllerPaths/Accounts';
import { AccountAuth } from '@dataTypes/Accounts';
import { StringParameter, ApiResponse } from '@dataTypes/ApiRequest';

class AccountsHelper {
  getToken = (account: AccountAuth): ApiResponse['body'] => {
    return cy.apiRequest(getTokenRequest(account)).then((resp) => {
      expect(resp.status).equal(200);
      return resp.body.access_token;
    });
  };

  checkAccountAuth = (
    token: StringParameter,
    username: StringParameter
  ): ApiResponse['body'] => {
    return cy.apiRequest(getAccountRequest(token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.AccountId).equal(username);
      return resp.body;
    });
  };

  checkAccountUnauth = (token: StringParameter): void => {
    cy.apiRequest(getAccountRequest(token)).then((resp) => {
      expect(resp.status).equal(401);
    });
  };

  getAccountBasketsUnauth = (token: StringParameter): void => {
    cy.apiRequest(getAccountBasketsRequest(token)).then((resp) => {
      expect(resp.status).equal(401);
    });
  };

  getAccountBasketsAuth = (token: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getAccountBasketsRequest(token)).then((resp) => {
      expect(resp.status).equal(200);
      return resp.body;
    });
  };
}

export default AccountsHelper;
