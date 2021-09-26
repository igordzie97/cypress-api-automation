import {
  getSpecificProduct,
  getProductsWithProducer,
  getProductsWithText,
  getProductSearchHints,
  getCompareProducts,
  postProductComment,
  postProductCommentVote,
  getProductDepartmentAvailability,
  getProductOnlineAvailability,
  getUserCommentAvailability,
  getProductBringingStatus,
  getProductComments,
} from '@controllerPaths/Products';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';
import { ProductComment } from '@dataTypes/Products';

class ProductsHelper {
  getSpecificProduct = (productId: StringParameter): ApiResponse['body'] => {
    return cy.apiRequest(getSpecificProduct(productId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(productId);

      return resp.body;
    });
  };

  getProductsWithProducer = (
    producerId: StringParameter,
    paginationPageSize = 50
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(getProductsWithProducer(producerId, paginationPageSize))
      .then((resp) => {
        expect(resp.status).equal(200);

        return resp.body;
      });
  };

  getProductsWithText = (
    searchText: StringParameter,
    paginationPageSize = 50
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(getProductsWithText(searchText, paginationPageSize))
      .then((resp) => {
        expect(resp.status).equal(200);

        return resp.body;
      });
  };

  getProductSearchHints = (
    searchText: StringParameter,
    paginationPageSize = 50
  ): ApiResponse['body'] => {
    return cy
      .apiRequest(getProductSearchHints(searchText, paginationPageSize))
      .then((resp) => {
        expect(resp.status).equal(200);

        return resp.body;
      });
  };

  getCompareProducts = (
    productsIds: StringParameter[]
  ): ApiResponse['body'] => {
    return cy.apiRequest(getCompareProducts(productsIds)).then((resp) => {
      expect(resp.status).equal(200);

      return resp.body;
    });
  };

  postProductComment = (
    productId: string,
    productComment: ProductComment,
    token: StringParameter
  ): void => {
    cy.apiRequest(postProductComment(productId, productComment, token)).then(
      (resp) => {
        expect(resp.status).equal(200);
      }
    );
  };

  getProductComments = (productId: StringParameter): void => {
    cy.apiRequest(getProductComments(productId)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  postProductCommentVote = (
    productId: StringParameter,
    commentId: StringParameter,
    token: StringParameter
  ): void => {
    cy.apiRequest(postProductCommentVote(productId, commentId, token)).then(
      (resp) => {
        expect(resp.status).equal(200);
      }
    );
  };

  getProductDepartmentAvailability = (productId: StringParameter): void => {
    cy.apiRequest(getProductDepartmentAvailability(productId)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getProductOnlineAvailability = (productId: StringParameter): void => {
    cy.apiRequest(getProductOnlineAvailability(productId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.ProductId + '').equal(productId);
    });
  };

  getUserCommentStatus = (
    productId: StringParameter,
    token?: StringParameter
  ): void => {
    cy.apiRequest(getUserCommentAvailability(productId, token)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getBringingStatus = (
    productId: StringParameter,
    postCode: StringParameter
  ): void => {
    cy.apiRequest(getProductBringingStatus(productId, postCode)).then(
      (resp) => {
        expect(resp.status).equal(200);
      }
    );
  };
}

export default ProductsHelper;
