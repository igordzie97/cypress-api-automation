import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export function getSpecificCategory(categoryId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').categories + '/' + categoryId,
    qs: {
      expand: 'ChildCategories, Producers',
      childCategoriesSort: 'ProductsCount desc',
    },
  };
}

export function getCategoriesInGroup(groupId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').categories,
    qs: {
      groupIds: groupId,
      expand: 'ChildCategories',
      sort: 'ProductsCount desc',
      childCategoriesSort: 'ProductsCount desc',
    },
  };
}
