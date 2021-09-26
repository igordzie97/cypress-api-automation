import ApiConfigHelper from '@helpers/ApiConfig';

describe('Test of the Time endpoint', () => {
  const apiConfigHelper = new ApiConfigHelper();

  it('should properly return code 200', () => {
    apiConfigHelper.getCurrentTime();
  });
});
