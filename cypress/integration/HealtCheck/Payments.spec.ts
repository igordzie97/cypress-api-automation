import PaymentsHelper from '@helpers/Payments';

describe('Test of The Payments endpoint', () => {
  const paymentsHelper = new PaymentsHelper();

  it('Should properly GET installments value', () => {
    paymentsHelper
      .getInstallmentSettings()
      .then((defaultInstallmentCount: number) => {
        cy.setLocalStorage(
          'defaultInstallmentCount',
          String(defaultInstallmentCount)
        );
      });
    cy.saveLocalStorage();
  });

  it('Should properly GET settings of installment calculator', () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage('defaultInstallmentCount').then(
      (defaultInstallmentCount) => {
        paymentsHelper.getInstallmentCalculation(
          1000,
          100,
          Number(defaultInstallmentCount)
        );
      }
    );
  });
});
