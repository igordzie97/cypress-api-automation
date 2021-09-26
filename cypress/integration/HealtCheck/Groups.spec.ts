import { ApiResponse } from '@dataTypes/ApiRequest';
import GroupsHelper from '@helpers/Groups';

describe('Test of the Groups endpoint', () => {
  const groupsHelper = new GroupsHelper();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should properly GET all groups and get random groupID', () => {
    groupsHelper.getAllGroups().then((body: ApiResponse['body']) => {
      const randomGroupId = groupsHelper.getRandomGroupId(body);
      cy.setLocalStorage('randomGroupId', randomGroupId);
    });
  });

  it('Should properly GET all groups with expand pole', () => {
    groupsHelper.getAllGroups('Categories');
  });

  it('Should properly GET information about random Group', () => {
    cy.getLocalStorage('randomGroupId').then((randomGroupId) => {
      groupsHelper.getSpecificGroup(randomGroupId);
    });
  });
});
