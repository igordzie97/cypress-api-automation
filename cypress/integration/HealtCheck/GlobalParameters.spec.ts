describe('Test of the GlobalParameters endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly GET globalparameters', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/GlobalParameters',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body.length).to.be.greaterThan(0);
        })
    })
})