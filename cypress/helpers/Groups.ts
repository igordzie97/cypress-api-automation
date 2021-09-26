import { getAllGroups, getSpecificGroup } from '@controllerPaths/Groups';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class GroupsHelper {
  getAllGroups = (expandPole?: string): ApiResponse['body'] => {
    return cy.apiRequest(getAllGroups(expandPole)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.length).to.be.greaterThan(0);

      return resp.body;
    });
  };

  getSpecificGroup = (groupId: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getSpecificGroup(groupId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(groupId);

      return resp.body;
    });
  };

  getRandomGroupId = (body: [ApiResponse['body']]): string => {
    const randomNumber = Math.floor((body.length - 0) * Math.random());

    return body[randomNumber].Id;
  };
}

export default GroupsHelper;
