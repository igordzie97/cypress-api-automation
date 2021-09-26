import {
  getSpecificCategory,
  getCategoriesInGroup,
} from '@controllerPaths/Categories';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class CategoriesHelper {
  getSpecificCategory = (categoryId: StringParameter): void => {
    cy.apiRequest(getSpecificCategory(categoryId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(categoryId);
    });
  };

  getCategoriesWithGroup = (groupId: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getCategoriesInGroup(groupId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);
      return resp.body;
    });
  };

  getRandomCategoryId = (body: ApiResponse['body']): string => {
    const random = Math.floor((body.length - 0) * Math.random());

    return body[random].Id;
  };
}

export default CategoriesHelper;
