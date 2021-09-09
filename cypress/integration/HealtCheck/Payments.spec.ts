describe('Test of The Payments endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly GET settings of installment calculator', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Payments/InstallmentCalculator',
            headers: {
                'X-API-Key': API_KEY
            },
            qs: {
                'TotalValue': 1000,
                'PrePaymentValue': 100
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body.InstallmentValues.length).equal(11);
        })
    })

    it('Should properly GET installments value', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Payments/InstallmentCalculatorSettings',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
        })
    })
})