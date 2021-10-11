# Example of API automation using Cypress

## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Configuration details](#configuration-details)
4. [Example of test construction](#example-of-test-construction)
5. [Commands and start up](#commands-and-start-up)

## Description
Project constists tests of several controllers. They are written using Cypress and TypeScript. To keep code in valid format, I've used prettier and eslint.
Whole project is containerized using Docker.

## Technologies
- **Cypress** (8.5.0) - JavaScript test framework
- **TypeScript** (4.4.3) - Adds additional syntax to JavaScript
- **Eslint** (7.32.0) -  Static code analyzer
- **Prettier** -  Code formatter, integrated with Visual Studio Code
- **Docker** - Containerization

## Structure
Project structure is organised similar to Page Object Pattern - Controller (similarity to Page), Controller Methods (similarity to Page Objects). Folders are divided into:
- **controllerPaths** - defined controllers with their specific methods. Each method has specific values: http method, url, headers, body, query strings.
- **dataTypes** - contains all interfaces for dataSet.
- **dataSet** - contains all defined set with specific data (based on interfaces from dataTypes).
- **helpers** - defined functions that are used in proper tests. Each file represents helper functions for one controller. Majority of them use data provided from controllerPaths to send request and check the response from API.
- **integration** - proper API tests. Each file represents one test suite (one controller). One `it` within file corresponds to one test case.
- **support** - defined custom functions and commands.

## Configuration details
**Interface of ApiRequest** - used to define controller method in the controllerPaths folder:
```typescript
export type StringParameter = string | null;
export type NumberParameter = number | null;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequest {
  method: RequestMethod;
  url: string;
  form?: boolean;
  body?: any;
  authHeader?: StringParameter;
  qs?: any;
}
```

**Custom request command** - defined in the `commands.ts` file. It substitues default `cy.request`. In the headers it includes necessary API-KEY and optional Bearer Token:
```typescript
Cypress.Commands.add('apiRequest', (request: ApiRequest) => {
  let token = '';

  if (request.authHeader != null) {
    token = 'Bearer ' + request.authHeader;
  }

  return cy.request({
    method: request.method,
    url: Cypress.env('BASE_URL') + request.url,
    headers: {
      'X-API-Key': Cypress.env('API_KEY'),
      Authorization: token,
    },
    body: request.body,
    form: request.form,
    qs: request.qs,
  });
});
```

`cypress.json` - includes all paths for endpoints.

`Dockerfile` - Docker configuration:
```dockerfile
FROM cypress/base:14.17.0

WORKDIR /app

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm install

CMD npx cypress run
```

## Example of test construction
- **controllerPaths**:
```typescript
export function getTokenRequest(account: AccountAuth): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('endpoints').token,
    form: true,
    body: {
      grant_type: 'password',
      username: account.email,
      password: account.password,
    },
  };
}

export function getAccountRequest(token: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').account,
    authHeader: token,
  };
}
```

- **helpers**:
```typescript
class AccountsHelper {
  getToken = (account: AccountAuth): ApiResponse['body'] => {
    return cy.apiRequest(getTokenRequest(account)).then((resp) => {
      expect(resp.status).equal(200);
      return resp.body.access_token;
    });
  };
  
  checkAccountAuth = (
    token: StringParameter,
    username: StringParameter
  ): ApiResponse['body'] => {
    return cy.apiRequest(getAccountRequest(token)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body.AccountId).equal(username);
      return resp.body;
    });
  };
}
```

- **integration** - local storage is used to share some values between test cases:
```typescript
describe('Test of Account endpoint', () => {
  const accountHelper = new AccountHelper();
  
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should GET Bearer token with given username and password', () => {
    accountHelper.getToken(testAccount).then((token: string) => {
      cy.setLocalStorage('token', token);
    });
    cy.saveLocalStorage();
  });
  
  it('should GET information about account with given Bearer token', () => {
    cy.restoreLocalStorage();

    cy.getLocalStorage('token').then((token) => {
      accountHelper.checkAccountAuth(token, testAccount.email);
    });
  });
})
```

## Commands and setting up
### Commands
`npm run lint` - check all the files with the eslint rules.

`npm run tsc` - type checking without compilation.

`npm run verify` - connection of lint and tsc command.

`docker build -t api:cypress .` - building docker image.

`npm run open` - open Cypress Test Runner.

`npm run headless` - run cypress tests headlessly.

### Setting up
To run project you need to provide two environment variables - `BASE_URL` and `API_KEY`. There are two approaches:
- **Preferred**: Create a `cypress.env.json` file:
```json
  "BASE_URL": "",
  "API_KEY": ""
```

- Provide using command, for example: 

`npm run open -- --env BASE_URL=url_value,API_KEY=key_value`
