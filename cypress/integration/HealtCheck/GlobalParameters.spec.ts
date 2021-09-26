import ApiConfigHelper from '@helpers/ApiConfig';

describe('Test of the GlobalParameters endpoint', () => {
  const apiConfigHelper = new ApiConfigHelper();

  it('Should properly GET globalparameters', () => {
    apiConfigHelper.getGlobalParameters();
  });
});
