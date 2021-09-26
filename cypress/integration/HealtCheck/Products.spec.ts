import { productsExample } from '@dataSets/Products';
import ProductsHelper from '@helpers/Products';

describe('Test of the Products endpoint', () => {
  const productsHelper = new ProductsHelper();

  it('Should properly get informations about test product', () => {
    productsHelper.getSpecificProduct(productsExample.hotShotId);
  });

  it('Should properly get informations about availability in departments', () => {
    productsHelper.getProductDepartmentAvailability(productsExample.basicId);
  });

  it('Should properly get informations about online availability', () => {
    productsHelper.getProductOnlineAvailability(productsExample.basicId);
  });

  it('Sould properly GET search hints', () => {
    productsHelper.getProductSearchHints('laptop');
  });

  it('Sould properly GET information if you can comment random product', () => {
    productsHelper.getUserCommentStatus(productsExample.basicId);
  });

  it('Should properly GET information about comments of the HotShot product', () => {
    productsHelper.getProductComments(productsExample.basicId);
  });

  it('Should properly GET ompare two random products by features and categories', () => {
    productsHelper.getCompareProducts([
      productsExample.basicId,
      productsExample.hotShotId,
    ]);
  });

  it('Should properly GET information about avability bringin service for product and postcode', () => {
    productsHelper.getBringingStatus(productsExample.basicId, '31-416');
  });
});
