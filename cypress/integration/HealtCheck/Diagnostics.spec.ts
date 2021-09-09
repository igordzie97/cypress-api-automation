describe('Test of the Diagnostics endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should GET health of api dependencies', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Diagnostics',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
        })
    })
})