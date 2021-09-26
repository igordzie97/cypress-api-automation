import { getConsents } from '@controllerPaths/Consents';
import { StringParameter } from '@dataTypes/ApiRequest';

class ConsentsHelper {
  getRandomContext = (contexts: string[]): string => {
    const random = Math.floor((contexts.length - 1) * Math.random());
    return contexts[random];
  };

  getConsents = (context: StringParameter): void => {
    cy.apiRequest(getConsents(context)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);

      const consents = resp.body;
      consents.forEach((consent: any) => {
        expect(consent.ContextCode).equal(context);
      });
    });
  };
}

export default ConsentsHelper;
