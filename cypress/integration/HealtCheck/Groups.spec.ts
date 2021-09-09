describe('Test of the Groups endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const paginationPageSize = 50;
    const hotShotId = 396852;
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly GET all groups and get random groupID', () => {
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

    it('Should properly GET all groups with expand pole', ()=> {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Groups',
            headers: {
                'X-API-Key': API_KEY
            },
            qs: {
                'expand': 'Categories'
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body.length).to.be.greaterThan(0);
        })
    })

    it('Should properly GET information about random Group', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('randomGroupID').then(groupID => {
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Groups/' + groupID,
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.Id).equal(groupID);
            })
        })
    })
})