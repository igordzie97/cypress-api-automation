describe('Test of the Consents endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('should return all consents of random context', () => {
        let contexts = [
            'basket_unregistered_customer', 
            'registration',
            'account',
            'help_center',
            'newsletter',
            'sales_masters',
            'landing_page',
            'availability',
            'contact',
            'newsletter_registered',
            'insurance_interest',
            'registration_typ',
            'availability_registered_customer',
            'account_mobile_app',
            'search_opinion',
            'basket_esd',
            'basket_promotion',
            'public_orders',
            'basket',
            'basket_send_to_client',
            'for_companies',
            'newsletter_email'
        ];

        let max_number = contexts.length - 1;
        let random = Math.floor((max_number - 0)*Math.random());
        let random_context = contexts[random];
        cy.log(random_context);

         cy.request({
             method: 'GET',
             url: urlApi + '/api/v1/xkom/Consents?consentContextCode=' + random_context,
             headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response).to.not.be.null;
            expect(response.body.length).to.be.greaterThan(0);
        })
    })
})