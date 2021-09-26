import {
  getCurrentHotShot,
  getHotShotPurchaes,
} from '@controllerPaths/HotShots';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class HotShotsHelper {
  getCurrentHotShot = (): ApiResponse['body'] => {
    return cy.apiRequest(getCurrentHotShot).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body.Product.Id;
    });
  };

  getHotShotPurchases = (hotShotId: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getHotShotPurchaes(hotShotId)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };
}

export default HotShotsHelper;
