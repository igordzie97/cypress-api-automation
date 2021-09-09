describe('Test of the InPostPackStations endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly GET all provinces InPost pack stations', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/InPostPackStations/Provinces',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            let random = Math.floor((response.body.length - 0)*Math.random());
            cy.log(response.body[random].Id);
            cy.setLocalStorage('provinceID', response.body[random].Id);
            cy.saveLocalStorage();
        })
    })

    it('Should properly GET cities InPost pack stations', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('provinceID').then(provinceID => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/InPostPackStations/Cities',
                headers: {
                    'X-API-Key': API_KEY
                },
                qs: {
                    'provinceId': provinceID
                }
            }).then(response => {
                expect(response.status).equal(200);
                let random = Math.floor((response.body.length - 0)*Math.random());
                cy.log(response.body[random].Id);
                cy.setLocalStorage('cityID', response.body[random].Id);
                cy.saveLocalStorage();
            })
        })
    })

    it('Should properly GET InPost pack stations list', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('provinceID').then(provinceID => {
            cy.getLocalStorage('cityID').then(cityID => {
                cy.request({
                    method: 'GET',
                    url: urlApi + '/api/v1/xkom/InPostPackStations',
                    headers: {
                        'X-API-Key': API_KEY
                    },
                    qs: {
                        'provinceId': provinceID,
                        'cityId': cityID
                    }
                }).then(response => {
                    expect(response.status).equal(200);
                    cy.setLocalStorage('inpostID', response.body[0].Id);
                    cy.saveLocalStorage();
                })
            })
        })
    })

    it('Should properly GET specific InPost pack station', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('inpostID').then(inpostID => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/InPostPackStations/' + inpostID,
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.Id).equal(inpostID);
            })
        })
    })
})