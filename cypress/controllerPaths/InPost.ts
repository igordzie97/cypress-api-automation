import { ApiRequest } from '@dataTypes/ApiRequest';

export const getInPostProvinces: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').inpost_provinces,
};

export function getInPostCitiesInProvince(
  provinceId: string | null
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').inpost_cities,
    qs: {
      provinceId: provinceId,
    },
  };
}

export function getInPostStations(
  provinceId: string | null,
  cityId: string | null
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').inpost,
    qs: {
      provinceId: provinceId,
      cityId: cityId,
    },
  };
}

export function getSpecificInPostStation(
  packStationId: string | null
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').inpost + '/' + packStationId,
  };
}
