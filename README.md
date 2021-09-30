# Example of API automation using Cypress

## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Configuration](#configuration)
4. [Commands and start up](#commands-and-start-up)

## Description
Project constists tests of several controllers. They are written using Cypress and TypeScript. To keep code in valid format, I've used prettier and eslint.
Whole project is containerized using Docker.

## Technologies
- **Cypress** (8.5.0) - JavaScript test framework
- **TypeScript** (4.4.3) - adds additional syntax to JavaScript
- **Eslint** (7.32.0) -  statically analyzer of code
- **Prettier** -  code formatter, integrated with Visual Studio Code
- **Docker** - containerization 

## Structure
Project structure is divided into:
- **controllerPaths/** - defined controllers with their specific methods. Each method has specific values: http method, url, headers, body, query strings.
- **dataTypes/** - contains all interfaces for dataSet.
- **dataSet/** - contains all defined set with specific data (based on interfaces from dataTypes).
- **helpers/** - defined functions that are used in proper tests. Each file represents helper functions for one controller. Majority of them use data provided from controllerPaths to send request and check the response from API.
- **integration/** - proper API tests. Each file represents one controller.
- **support/** - defined custom functions and commands.

## Configuration

## Commands and start up
npm run verify
npm run lin
npm run tsc
docker build -t api:cypress .
npm run cypress:open -- --env BASE_URL=
