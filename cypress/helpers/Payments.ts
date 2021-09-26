import {
  getInstallmentCalculation,
  getInstallmentSettings,
} from '@controllerPaths/Payments';
import { ApiResponse, NumberParameter } from '@dataTypes/ApiRequest';

class PaymentsHelper {
  getInstallmentCalculation = (
    totalValue: NumberParameter,
    prePaymentValue: NumberParameter,
    installmentCount: NumberParameter
  ): void => {
    cy.apiRequest(getInstallmentCalculation(totalValue, prePaymentValue)).then(
      (resp) => {
        expect(resp.status).equal(200);
        expect(resp.body.InstallmentValues.length).equal(installmentCount);
      }
    );
  };

  getInstallmentSettings = (): ApiResponse['body'] => {
    return cy.apiRequest(getInstallmentSettings).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body[0].DefaultInstallmentCount;
    });
  };
}

export default PaymentsHelper;
