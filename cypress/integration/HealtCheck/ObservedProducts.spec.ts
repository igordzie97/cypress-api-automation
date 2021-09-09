describe("Test of the ObservedProducts endpoit", () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const skuTest = 396852;
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
                'grant_type': 'password',
                'username': 'api@koszmail.pl',
                'password': 'apitest'
            }
        }).then(response => {
            cy.setLocalStorage('access_token', 'Bearer ' + response.body.access_token);
            cy.saveLocalStorage();
        })
    })

    it('Should properly POST specific observed product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('access_token').then(token => {
            cy.request({
                method: 'POST',
                url: urlApi + '/api/v1/xkom/ObservedProducts',
                headers: {
                    'X-API-Key': API_KEY,
                    'Authorization': token
                },
                qs: {
                    'productId': skuTest
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })

    it('Should properly GET all observed product and save specific ID', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('access_token').then(token => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/ObservedProducts',
                headers: {
                    'X-API-Key': API_KEY,
                    'Authorization': token
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body[0].ProductHeader.Id).equal(skuTest+"");
                let specificID = response.body[0].Id;
                cy.setLocalStorage('specificID', specificID);
                cy.saveLocalStorage();
            })
        })
    })

    it('Should properly GET specific observed product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('access_token').then(token => {
            cy.getLocalStorage('specificID').then(specificID => {
                cy.request({
                    method: 'GET',
                    url: urlApi + '/api/v1/xkom/ObservedProducts/' + specificID,
                    headers: {
                        'X-API-Key': API_KEY,
                        'Authorization': token
                    }
                }).then(response => {
                    expect(response.status).equal(200);
                    expect(response.body.Id).equal(specificID);
                })
            })
        })
    })

    it('Should properly DELETE specific observed product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('access_token').then(token => {
            cy.getLocalStorage('specificID').then(specificID => {
                cy.request({
                    method: 'DELETE',
                    url: urlApi + '/api/v1/xkom/ObservedProducts/' + specificID,
                    headers: {
                        'X-API-Key': API_KEY,
                        'Authorization': token
                    }
                }).then(response => {
                    expect(response.status).equal(200);
                })
            })
        })
    })
})