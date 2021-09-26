import { contexts } from '@dataSets/Consents';
import ConsentsHelper from '@helpers/Consents';

describe('Test of the Consents endpoint', () => {
  const consentsHelper = new ConsentsHelper();

  it('Should return all consents of random context', () => {
    const randomContext = consentsHelper.getRandomContext(contexts);

    consentsHelper.getConsents(randomContext);
  });
});
