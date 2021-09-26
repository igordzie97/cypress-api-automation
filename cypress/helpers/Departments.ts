import {
  getDepartmentsCities,
  getDepartments,
  getDepartmentsInCity,
  getSpecificDepartment,
} from '@controllerPaths/Departments';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class DepartmentsHelper {
  getAllCities = (): ApiResponse['body'] => {
    return cy.apiRequest(getDepartmentsCities).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);

      return resp.body;
    });
  };

  getAllDepartments = (): ApiResponse['body'] => {
    return cy.apiRequest(getDepartments).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(20);

      return resp.body;
    });
  };

  getDepartmentsWithCity = (cityName: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getDepartmentsInCity(cityName)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);

      const departments = resp.body;
      departments.forEach((department: any) => {
        expect(department.Address.City).equal(cityName);
      });

      return resp.body;
    });
  };

  getSpecificDepartment = (
    departmentId: StringParameter
  ): ApiResponse['body'] => {
    return cy.apiRequest(getSpecificDepartment(departmentId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(departmentId);

      return resp.body;
    });
  };

  getRandomCity = (body: ApiResponse['body']): string => {
    const randomNumber = Math.floor((body.length - 0) * Math.random());
    return body[randomNumber];
  };

  getRandomDepartmentId = (body: ApiResponse['body']): string => {
    const randomNumber = Math.floor((body.length - 0) * Math.random());
    return body[randomNumber].Id;
  };
}

export default DepartmentsHelper;
