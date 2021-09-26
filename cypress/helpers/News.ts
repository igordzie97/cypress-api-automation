import {
  getNews,
  getSpecificNews,
  getSpecificNewsComments,
} from '@controllerPaths/News';
import { ApiResponse, StringParameter } from '@dataTypes/ApiRequest';

class NewsHelper {
  getNews = (paginationSize = 10): ApiResponse['body'] => {
    return cy.apiRequest(getNews(paginationSize)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Items.length).equal(paginationSize);

      return resp.body;
    });
  };

  getSpecificNews = (newsId: StringParameter): void => {
    cy.apiRequest(getSpecificNews(newsId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.Id).equal(newsId);
    });
  };

  getSpecificNewsComments = (newsId: StringParameter): void => {
    cy.apiRequest(getSpecificNewsComments(newsId)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };

  getRandomNewsId = (
    body: ApiResponse['body'],
    paginationSize = 10
  ): string => {
    const random = Math.floor((paginationSize - 0) * Math.random());
    return body.Items[random].Id;
  };
}

export default NewsHelper;
