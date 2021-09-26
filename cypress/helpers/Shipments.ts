import { getWaybillNumber } from '@controllerPaths/Shipments';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class ShipmentsHelper {
  getWaybillNumber = (waybillNumber: StringParameter): void => {
    cy.apiRequest(getWaybillNumber(waybillNumber)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.WaybillNumber).equal(waybillNumber);
    });
  };

  getWaybillNumbersFromOrder = (body: ApiResponse['body']): string[] => {
    const arrayWaybillNumbers: string[] = [];
    let temp = 0;
    for (let i = 0; i < body.Items.length; i++) {
      if (body.Items[i].WaybillNumber != null) {
        arrayWaybillNumbers[temp] = body.Items[i].WaybillNumber;
        temp++;
      }
    }

    return arrayWaybillNumbers;
  };
}

export default ShipmentsHelper;
