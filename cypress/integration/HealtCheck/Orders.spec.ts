describe('Test of the Orders endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    before(() => {
        cy.request({
            method: 'POST',
            url: urlApi + '/api/v1/xkom/Token',
            headers : {
                'X-API-Key': API_KEY
            },
            form: true,
            body: {
                grant_type: 'password',
                username: 'api@koszmail.pl',
                password: 'apitest'
            }
        }).then(response => {
            cy.setLocalStorage('access_token', 'Bearer ' + response.body.access_token);
            cy.saveLocalStorage();
        })
    })

    it('Should properly GET Orders', () => {
        cy.getLocalStorage('access_token').then(token => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Orders',
                headers: {
                    'X-API-Key': API_KEY,
                    'Authorization': token
                }
            }).then(response => {
                expect(response.status).equal(200);
                let random = Math.floor((response.body.Items.length - 0)*Math.random());
                cy.setLocalStorage('orderID', response.body.Items[random].Id);
                cy.saveLocalStorage();
            })
        })
    })

    it('Should properly GET last order', ()  => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('access_token').then(token => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Orders/LastOrder',
                headers: {
                    'X-API-Key': API_KEY,
                    'Authorization': token
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })

    it('Should GET specific Order', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('orderID').then(orderID => {
            cy.getLocalStorage('access_token').then(token => {
                cy.request({
                    method: 'GET',
                    url: urlApi + '/api/v1/xkom/Orders/' + orderID,
                    headers: {
                        'X-API-Key': API_KEY,
                        'Authorization': token
                    }
                }).then(response => {
                    expect(response.status).equal(200);
                    expect(response.body.Id).equal(orderID);
                })
            })
        })
    })
})