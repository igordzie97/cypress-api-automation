import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export const getDepartmentsCities: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').departments_city,
};

export const getDepartments: ApiRequest = {
  method: 'GET',
  url: Cypress.env('endpoints').departments,
};

export function getDepartmentsInCity(cityName: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').departments,
    qs: {
      city: cityName,
    },
  };
}

export function getSpecificDepartment(
  departmentId: StringParameter
): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').departments + '/' + departmentId,
  };
}
