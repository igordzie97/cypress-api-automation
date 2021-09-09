describe('Test of news endopint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('should return ten newest news', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/News',
            headers : {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            let random = Math.floor((10 - 0)*Math.random());
            const randomID = response.body.Items[random].Id;
            cy.setLocalStorage('random_id', randomID);
            cy.saveLocalStorage()
        })
    })

    it('should return the specific news with given id', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.log(id);
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/News/' + id,
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.Id).equal(id)
            })
        })
    })

    it('should return comments of the specific news with given id', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/News/' + id,
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200)
            })
        })
    })
})