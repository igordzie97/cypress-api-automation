describe('Test of the Departments endpoint', () => {
    const API_KEY = 'ZyOodoS0W0QPao6Z';
    const urlApi = 'https://mobileapi.x-kom.it';

    it('Should properly GET all cities where departments are', () => {
        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Departments/Cities',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            let citiesArray = response.body;
            expect(citiesArray.length).to.be.greaterThan(0);
            let random = Math.floor((citiesArray.length - 0)*Math.random());
            let randomCity = citiesArray[random];
            cy.setLocalStorage('randomCityName', randomCity);
            cy.saveLocalStorage();
        })
    })

    it('Should properly GET all departments and save random department ID', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('randomCityName').then(string => {
            cy.log(string);
        })

        cy.request({
            method: 'GET',
            url: urlApi + '/api/v1/xkom/Departments',
            headers: {
                'X-API-Key': API_KEY
            }
        }).then(response => {
            expect(response.status).equal(200);
            let departmentsArray = response.body;
            expect(departmentsArray.length).to.be.greaterThan(20);
            let random = Math.floor((departmentsArray.length - 0)*Math.random());
            let randomDepartmentID = departmentsArray[random].Id;
            cy.setLocalStorage('randomDepartmentID', randomDepartmentID);
            cy.saveLocalStorage();
        })
    })

    it('Should properly GET all departments with given city', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('randomCityName').then(cityValue => {
            cy.log(cityValue);
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Departments',
                headers: {
                    'X-API-Key': API_KEY
                },
                qs: {
                    'city': cityValue
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.length).to.be.greaterThan(0);
            })
        })
    })

    it('Should properly GET specific department with given ID', () => {
        cy.restoreLocalStorage();
        cy.getLocalStorage('randomDepartmentID').then(departmentID => {
            cy.log(departmentID);
            cy.request({
                method: 'GET',
                url: urlApi + '/api/v1/xkom/Departments/' + departmentID,
                headers: {
                    'X-API-Key': API_KEY
                }
            }).then(response => {
                expect(response.status).equal(200);
                expect(response.body.Id).equal(departmentID);
            })
        })
    })
})