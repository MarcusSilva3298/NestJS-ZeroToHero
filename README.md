Task Manager
=
<div align="center">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres">
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT">
<img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
<img src="https://img.shields.io/badge/Nest JS-%23E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Nest JS">
</div>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript project following the [NestJS Zero To Hero](https://www.udemy.com/course/nestjs-zero-to-hero/) Udemy course. This project consists in a ToDo RESTful API with:
*  Authentication with JWT and semi-Authorization.
*  Validation.
*  Error Handling.
*  Data Persistence with TypeORM in Postgres.
*  Unit Testing with Jest.


This App is deployed on Heroku: https://task-management-marcussilva329.herokuapp.com/api/.

## Running the app remotely

As this app is available on Heroku it can be used in the Swagger documentation endpoint written above or in any REST Client (Insomnia, Postman, etc).

## Running the app localy

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Installation

```bash
$ npm install
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
