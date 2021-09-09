class HotShotsHelper {
    getCurrentHotShot = () => {
        return cy.request({
            method: 'GET',
            url: Cypress.env('BASE_URL') + Cypress.env('endpoints').hotshots_current,
            headers: {
                'X-API-Key': Cypress.env('API_KEY')
            }
        }).then((response) => {
            expect(response.status).equal(200);
            return response.body.Product.Id;
        })
    }
}

export default HotShotsHelper;