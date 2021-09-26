import {
  getInPostProvinces,
  getInPostCitiesInProvince,
  getInPostStations,
  getSpecificInPostStation,
} from '@controllerPaths/InPost';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class InPostHelper {
  getProvinces = (): ApiResponse['body'] => {
    return cy.apiRequest(getInPostProvinces).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);

      return resp.body;
    });
  };

  getCitiesInProvince = (provinceId: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getInPostCitiesInProvince(provinceId)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };

  getPackStationsInProvinceAndCity = (
    provinceId: StringParameter,
    cityId: StringParameter
  ): ApiResponse['body'] => {
    return cy.apiRequest(getInPostStations(provinceId, cityId)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };

  getSpecificPackSation = (packStationId: StringParameter): void => {
    cy.apiRequest(getSpecificInPostStation(packStationId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(packStationId);
    });
  };

  getRandomProvinceOrCityId = (body: ApiResponse['body']): string => {
    const randomNumber = Math.floor((body.length - 0) * Math.random());
    return body[randomNumber].Id;
  };
}

export default InPostHelper;
