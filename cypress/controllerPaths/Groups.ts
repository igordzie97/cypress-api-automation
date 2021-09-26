import { ApiRequest, StringParameter } from '@dataTypes/ApiRequest';

export function getAllGroups(expandPole?: string): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').groups,
    qs: {
      expand: expandPole,
    },
  };
}

export function getSpecificGroup(groupId: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').groups + '/' + groupId,
  };
}
