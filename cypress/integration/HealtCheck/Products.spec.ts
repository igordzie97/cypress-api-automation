describe('Test of the Products endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const paginationPageSize = 50;
    const hotShotId = 396852;
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly return all the laptops and get random item', ()=> {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Products',
            headers : {
                'X-API-Key': API_KEY
            },
            qs: {
                'Criteria.ProducerIds' : 357,
                'Criteria.SearchText' : 'laptop',
                'Pagination.PageSize' : paginationPageSize
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.status.CurrentTime).to.not.be.null;

            let random = Math.floor((paginationPageSize - 0)*Math.random());
            let random1 = Math.floor((paginationPageSize - 0)*Math.random());
            let random2 = Math.floor((paginationPageSize - 0)*Math.random());

            const randomID = response.body.Items[random].Id;
            const randomID_1 = response.body.Items[random1].Id;
            const randomID_2 = response.body.Items[random2].Id;

            var randomIDs = {
                id_1: randomID_1,
                id_2: randomID_2
            };

            cy.setLocalStorage('random_id', randomID);
            cy.setLocalStorage('object', JSON.stringify(randomIDs));
            cy.saveLocalStorage();
        })
    })

    it('Should properly get informations about random product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.log(id);

            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Products/' + id,
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.Id).equal(id)
            })
        })
    })

    it('Should properly get informations about availability in departments', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.log(id);

            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Products/' + id + '/DepartmentsAvailability',
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })

    it('Should properly get informations about online availability', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.log(id);

            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Products/' + id + '/OnlineAvailability',
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })

    it('Sould properly GET search hints', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Products/SearchHints',
            headers : {
                'X-API-Key': API_KEY
            },
            qs: {
                'text' : 'laptop',
                'limit' : paginationPageSize
            }
        }).then(response => {
            expect(response.status).equal(200);
        })
    })

    it('Sould properly GET information if you can comment random product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Products/' + id + '/UserCommentStatus',
                headers : {
                    'X-API-Key': API_KEY
                },
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body).to.have.any.keys('ProductCommentId', 'CanCreateComments');
                expect(response.body).to.have.all.keys('ProductCommentId', 'CanCreateComments');
            })
        })
    })

    it('Sould properly POST comment for random product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.request({
                method: 'POST',
                url: urlApi + '/api/v1/xkom/Products/' + id + '/Comments',
                headers : {
                    'X-API-Key': API_KEY
                },
                body: {
                    'AuthorName': 'CypressApiTestID' + id,
                    'Body': 'cypress API test' + id,
                    'Rating': 6,
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })

    it('Should properly GET information about comments of the HotShot product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('random_id').then(id => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Products/' + hotShotId + '/Comments',
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                cy.setLocalStorage('comment_id', response.body.Items[0].Id);
                cy.saveLocalStorage();
            })
        })
    })

    it('Should properly POST comment vote for added comment to random product', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('comment_id').then(commentID => {
            cy.request({
                method: 'POST',
                url: 'https://mobileapi.eeepad.pl/api/v1/xkom/Products/' + hotShotId + '/Comments/' + commentID +'/Votes',
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
            })
        })
    })

    it('Should properly GET ompare two random products by features and categories', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('object').then(body => {
            let tmp = JSON.parse(body);
            let firstID = tmp.id_1;
            let secondID = tmp.id_2;

            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Products/CompareProducts',
                headers: {
                    'X-API-Key': API_KEY
                },
                qs: {
                    'productsIds': firstID, secondID,
                }
            }).then(response => {
                expect(response.status).equal(200);
                cy.log(response.body);
            })


        })
    })

    it('Should properly GET information about avability bringin service for product and postcode', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Products/' + hotShotId + '/BringingService',
            headers : {
                'X-API-Key': API_KEY
            },
            qs: {
                'PostCode': '31-416'
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body).to.have.any.keys('IsAvailable');
        })
    })
})