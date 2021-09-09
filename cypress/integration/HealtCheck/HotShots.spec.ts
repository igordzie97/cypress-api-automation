describe('Test of the HotShots endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly GET current HotShot and save the ID', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/HotShots/current',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            cy.setLocalStorage('hotshotID', response.body.Id);
            cy.saveLocalStorage();
        })
    })

    it('Should properly GET purchase offers list with given HotShot id', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('hotshotID').then(hotshotID => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/HotShots/' + 13768 + '/PurchaseOffers',
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })
})