import { ApiResponse } from '@dataTypes/ApiRequest';
import DepartmentsHelper from '@helpers/Departments';

describe('Test of the Departments endpoint', () => {
  const departmentsHelper = new DepartmentsHelper();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should properly GET all cities where departments are', () => {
    departmentsHelper.getAllCities().then((body: ApiResponse['body']) => {
      const randomCity = departmentsHelper.getRandomCity(body);
      cy.setLocalStorage('randomCity', randomCity);
    });
  });

  it('Should properly GET all departments and save random department ID', () => {
    departmentsHelper.getAllDepartments().then((body: ApiResponse['body']) => {
      const randomDepartmentId = departmentsHelper.getRandomDepartmentId(body);
      cy.setLocalStorage('randomDepartmentId', randomDepartmentId);
    });
  });

  it('Should properly GET all departments with given city', () => {
    cy.getLocalStorage('randomCity').then((randomCity) => {
      departmentsHelper.getDepartmentsWithCity(randomCity);
    });
  });

  it('Should properly GET specific department with given ID', () => {
    cy.getLocalStorage('randomDepartmentId').then((randomDepartmentId) => {
      departmentsHelper.getSpecificDepartment(randomDepartmentId);
    });
  });
});
