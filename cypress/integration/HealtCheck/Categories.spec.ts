describe('Test of the categories endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    before(() => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Groups',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            let size = response.body.length;
            expect(size).to.be.greaterThan(0);
            let random = Math.floor((size - 0)*Math.random());
            let randomGroupID = response.body[random].Id;
            cy.setLocalStorage('randomGroupID', randomGroupID);
            cy.saveLocalStorage();
        })
    }) 

    it('Should properly GET all product categories with given groupID, expand pole and sort both descending by the ProductsCount', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('randomGroupID').then(grouID => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Categories',
                headers: {
                    'X-API-Key': API_KEY
                },
                qs: {
                    'groupIds': grouID,
                    'expand': 'ChildCategories',
                    'sort': 'ProductsCount desc',
                    'childCategoriesSort': 'ProductsCount desc'
                }
            }).then(response => {
                expect(response.status).equal(200);
                let size = response.body.length;
                expect(size).to.be.greaterThan(0);
                let random = Math.floor((size - 0)*Math.random());
                let categoryID = response.body[random].Id;
                cy.setLocalStorage('randomCategoryID', categoryID);
                cy.saveLocalStorage();
            })
        })
    })  

    it('Should properly GET specific product categories with expand pole and sort it descending', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('randomCategoryID').then(categoryID => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Categories/' + categoryID,
                headers: {
                    'X-API-Key': API_KEY
                },
                qs: {
                    'expand': 'ChildCategories, Producers',
                    'childCategoriesSort': 'ProductsCount desc'
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.Id).equal(categoryID);
            })
        })
    })
})
