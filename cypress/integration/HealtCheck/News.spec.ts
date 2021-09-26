import { ApiResponse } from '@dataTypes/ApiRequest';
import NewsHelper from '@helpers/News';

describe('Test of news endopint', () => {
  const newsHelper = new NewsHelper();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should return ten newest news', () => {
    newsHelper.getNews().then((body: ApiResponse['body']) => {
      const randomNewsId = newsHelper.getRandomNewsId(body);
      cy.setLocalStorage('newsId', randomNewsId);
    });
    cy.saveLocalStorage();
  });

  it('should return the specific news with given id', () => {
    cy.getLocalStorage('newsId').then((newsId) => {
      newsHelper.getSpecificNews(newsId);
    });
  });

  it('should return comments of the specific news with given id', () => {
    cy.getLocalStorage('newsId').then((newsId) => {
      newsHelper.getSpecificNewsComments(newsId);
    });
  });
});
