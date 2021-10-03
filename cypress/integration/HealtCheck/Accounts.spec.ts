import { testAccount } from '@dataSets/Accounts';
import AccountHelper from '@helpers/Accounts';

describe('Test of Account endpoint', () => {
  const accountHelper = new AccountHelper();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should GET Bearer token with given username and password', () => {
    accountHelper.getToken(testAccount).then((token: string) => {
      cy.setLocalStorage('token', token);
    });
    cy.saveLocalStorage();
  });

  it('should GET information about account with given Bearer token', () => {
    cy.getLocalStorage('token').then((token) => {
      accountHelper.checkAccountAuth(token, testAccount.email);
    });
  });

  it('should properly GET Account baskets with given Bearer token', () => {
    cy.getLocalStorage('token').then((token) => {
      accountHelper.getAccountBasketsAuth(token);
    });
  });
});
