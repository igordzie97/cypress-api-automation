import {
  getBasket,
  getBasketBasicData,
  postEmptyBasket,
  postBasket,
  putBasket,
  patchBasket,
  deleteBasket,
  deleteBasketItem,
  getBasketBarcode,
  getBasketComplementaryProducts,
  getBasketOptions,
  postBasketOptions,
} from '@controllerPaths/Baskets';
import { StringParameter, ApiResponse } from '@dataTypes/ApiRequest';
import { ProductItem, Option } from '@dataTypes/Baskets';

class BasketsHelper {
  private checkBasketItems = (
    bodyItems: any[],
    productItems: ProductItem[]
  ): void => {
    let temp = 0;
    bodyItems.forEach((productItem: any) => {
      expect(productItem.ProductId).equal(productItems[temp].ProductId);
      expect(productItem.Count).equal(productItems[temp].Count);
      temp++;
    });
  };

  postEmptyBasket = (token: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(postEmptyBasket(token)).then((resp) => {
      expect(resp.status).equal(200);
      return resp.body.BasketToken;
    });
  };

  postBasket = (
    products: ProductItem[],
    token: StringParameter
  ): ApiResponse['body'] => {
    return cy.apiRequest(postBasket(products, token)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };

  putBasket = (
    basketToken: StringParameter,
    productItems: ProductItem[],
    token: StringParameter
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(putBasket(basketToken, productItems, token))
      .then((resp) => {
        expect(resp.status).equal(200);
        this.checkBasketItems(resp.body.Items, productItems);

        return resp.body;
      });
  };

  patchBasket = (
    basketToken: StringParameter,
    productItems: ProductItem[],
    token: StringParameter
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(patchBasket(basketToken, productItems, token))
      .then((resp) => {
        expect(resp.status).equal(200);
        this.checkBasketItems(resp.body.Items, productItems);

        return resp.body;
      });
  };

  deleteBasketItem = (
    basketToken: StringParameter,
    productPositionId: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(deleteBasketItem(basketToken, productPositionId, token)).then(
      (resp) => {
        expect(resp.status).equal(200);
      }
    );
  };

  getBasketBarcode = (
    basketToken: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(getBasketBarcode(basketToken, token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.PlainData).equal(basketToken);
    });
  };

  getBasketComplementaryProducts = (
    basketToken: StringParameter,
    token: StringParameter,
    limit = 15
  ): void => {
    cy.apiRequest(
      getBasketComplementaryProducts(basketToken, token, limit)
    ).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getBasketOptions = (
    basketToken: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(getBasketOptions(basketToken, token)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  postBasketOptions = (
    basketToken: StringParameter,
    option: Option[],
    token: StringParameter
  ): void => {
    cy.apiRequest(postBasketOptions(basketToken, option, token)).then(
      (resp) => {
        expect(resp.status).equal(200);
        expect(resp.body.SelectedOptions[0].Code).equal(option[0].Code);
      }
    );
  };

  getBasketBasicData = (
    basketToken: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(getBasketBasicData(basketToken, token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.BasketToken).equal(basketToken);
    });
  };

  getBasket = (basketToken: StringParameter, token: StringParameter): void => {
    cy.apiRequest(getBasket(basketToken, token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.BasketToken).equal(basketToken);
    });
  };

  deleteBasket = (
    basketToken: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(deleteBasket(basketToken, token)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };
}

export default BasketsHelper;
