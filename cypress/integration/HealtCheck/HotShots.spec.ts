import HotShotsHelper from '@helpers/HotShots';

describe('Test of the HotShots endpoint', () => {
  const hotShotsHelper = new HotShotsHelper();

  it('Should properly GET current HotShot and save the ID', () => {
    hotShotsHelper.getCurrentHotShot().then((hotShotId: string) => {
      cy.setLocalStorage('hotShotId', hotShotId);
    });
    cy.saveLocalStorage();
  });

  it('Should properly GET purchase offers list with given HotShot id', () => {
    cy.restoreLocalStorage();
    cy.getLocalStorage('hotShotId').then((hotShotId) => {
      hotShotsHelper.getHotShotPurchases(hotShotId);
    });
  });
});
