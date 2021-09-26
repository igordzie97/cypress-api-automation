import { getDiagnosticsRequest } from '@controllerPaths/Diagnostics';
import { getGlobalParametersRequest } from '@controllerPaths/GlobalParameters';
import { getCurrentTimeRequest } from '@controllerPaths/Time';

class ApiConfigHelper {
  getCurrentTime = (): void => {
    cy.apiRequest(getCurrentTimeRequest).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getGlobalParameters = (): void => {
    cy.apiRequest(getGlobalParametersRequest).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);
    });
  };

  getDiagnostics = (): void => {
    cy.apiRequest(getDiagnosticsRequest).then((resp) => {
      expect(resp.status).equal(200);
    });
  };
}

export default ApiConfigHelper;
