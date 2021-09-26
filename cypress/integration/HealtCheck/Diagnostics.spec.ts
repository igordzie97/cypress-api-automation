import ApiConfigHelper from '@helpers/ApiConfig';

describe('Test of the Diagnostics endpoint', () => {
  const apiConfigHelper = new ApiConfigHelper();

  it('Should GET health of api dependencies', () => {
    apiConfigHelper.getDiagnostics();
  });
});
