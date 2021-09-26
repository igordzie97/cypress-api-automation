import { ApiResponse } from '@dataTypes/ApiRequest';
import InPostHelper from '@helpers/InPost';

describe('Test of the InPostPackStations endpoint', () => {
  const inPostHelper = new InPostHelper();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should properly GET all provinces InPost pack stations', () => {
    inPostHelper.getProvinces().then((body: ApiResponse['body']) => {
      const randomProvinceId = inPostHelper.getRandomProvinceOrCityId(body);
      cy.log(randomProvinceId);
      cy.setLocalStorage('randomProvinceId', randomProvinceId);
    });
    cy.saveLocalStorage();
  });

  it('Should properly GET cities InPost pack stations', () => {
    cy.getLocalStorage('randomProvinceId').then((randomProvinceId) => {
      inPostHelper
        .getCitiesInProvince(randomProvinceId)
        .then((body: ApiResponse['body']) => {
          const randomCityId = inPostHelper.getRandomProvinceOrCityId(body);
          cy.setLocalStorage('randomCityId', randomCityId);
        });
    });
  });

  it('Should properly GET InPost pack stations list', () => {
    cy.getLocalStorage('randomProvinceId').then((randomProvinceId) => {
      cy.getLocalStorage('randomCityId').then((randomCityId) => {
        inPostHelper
          .getPackStationsInProvinceAndCity(randomProvinceId, randomCityId)
          .then((body: ApiResponse['body']) => {
            cy.setLocalStorage('inPostStationId', body[0].Id);
          });
      });
    });
  });

  it('Should properly GET specific InPost pack station', () => {
    cy.getLocalStorage('inPostStationId').then((inPostStationId) => {
      inPostHelper.getSpecificPackSation(inPostStationId);
    });
  });
});
