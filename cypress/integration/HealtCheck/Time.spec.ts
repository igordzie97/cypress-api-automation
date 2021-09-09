describe('Test of the Time endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('should properly return code 200', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Time',
            headers : {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200)
            expect(response.status.CurrentTime).to.not.be.null
        })
    })
})