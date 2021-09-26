import {
  getAllObservedProducts,
  getObservedProduct,
  postObservedProduct,
  deleteObservedProduct,
} from '@controllerPaths/ObservedProducts';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class ObservedProductsHelper {
  getAllObservedProducts = (token: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getAllObservedProducts(token)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };

  postSpecificObservedProduct = (
    productId: StringParameter,
    token: StringParameter
  ): ApiResponse['body'] => {
    return cy.apiRequest(postObservedProduct(productId, token)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };

  getSpecificObservedProduct = (
    productId: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(getObservedProduct(productId, token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(productId);
    });
  };

  deleteSpecificObservedProduct = (
    productId: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(deleteObservedProduct(productId, token)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getRandomObservedProductId = (body: ApiResponse['body']): string => {
    const randomNumber = Math.floor((body.length - 0) * Math.random());
    return body[randomNumber].Id;
  };
}

export default ObservedProductsHelper;
