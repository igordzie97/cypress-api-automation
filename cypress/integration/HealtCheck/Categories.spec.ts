import { ApiResponse } from '@dataTypes/ApiRequest';
import CategoriesHelper from '@helpers/Categories';
import GroupsHelper from '@helpers/Groups';

describe('Test of the categories endpoint', () => {
  const categoriesHelper = new CategoriesHelper();
  const groupsHelper = new GroupsHelper();

  before(() => {
    groupsHelper.getAllGroups().then((body: ApiResponse['body']) => {
      const randomGroupId = groupsHelper.getRandomGroupId(body);
      cy.setLocalStorage('randomGroupId', randomGroupId);
    });
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should properly GET all product categories with given groupID, expand pole and sort both descending by the ProductsCount', () => {
    cy.getLocalStorage('randomGroupId').then((randomGroupId) => {
      categoriesHelper
        .getCategoriesWithGroup(randomGroupId)
        .then((body: ApiResponse['body']) => {
          const randomCategoryId = categoriesHelper.getRandomCategoryId(body);
          cy.setLocalStorage('randomCategoryId', randomCategoryId);
        });
    });
  });

  it('Should properly GET specific product categories with expand pole and sort it descending', () => {
    cy.getLocalStorage('randomCategoryId').then((randomCategoryId) => {
      categoriesHelper.getSpecificCategory(randomCategoryId);
    });
  });
});
