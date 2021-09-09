describe('Test of the shipments endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const paginationPageSize = 300;
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
            cy.setLocalStorage('access_token', 'Bearer ' + response.body.access_token)
        })

        cy.getLocalStorage('access_token').then(token => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Orders',
                headers: {
                    'X-API-Key': API_KEY,
                    'Authorization': token
                },
                qs: {
                    'Criteria.StatusIds': 'Closed',
                    'Pagination.PageSize': paginationPageSize
                }
            }).then(response => {
                expect(response.status).equal(200);
                let lenght = response.body.Items.length;
                expect(lenght).equal(paginationPageSize);

                let arrayWaybillNumbers = [];
                let temp = 0;
                for (let i = 0; i < lenght; i++) {
                    if(response.body.Items[i].WaybillNumber != null) {
                        arrayWaybillNumbers[temp] = response.body.Items[i].WaybillNumber;
                        temp++;
                    }
                }
                cy.setLocalStorage('WaybillNumbers', arrayWaybillNumbers);
            })
        })
        cy.saveLocalStorage();
    })
    
    it('Should properly GET information about shipment by random waybillnumber', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('WaybillNumbers').then(array => {
            let wayBillArray = array.split(',');
            let random = Math.floor((wayBillArray.length - 0)*Math.random());
            cy.log(wayBillArray[random]);

            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Shipments/' + wayBillArray[random],
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.WaybillNumber).equal(wayBillArray[random]);
            })
        })
    })
})