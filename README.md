# NodeJs Backend Challenge

[![Docker Image CI](https://github.com/ashrash/backendNode/actions/workflows/docker-build-deploy.yml/badge.svg)](https://github.com/ashrash/backendNode/actions/workflows/docker-build-deploy.yml)

Tech: Node + Express + MongoDB/Mongoose + Typescript + Swagger + Docker

An App with CRUD Operations on User and Hobbies collection on MongoDB. 

MongoDb database is hosted at [MongoDB Atlas](https://www.mongodb.com/atlas/database),
Backend service is hosted at [Digital Ocean](https://www.digitalocean.com/)

CI/CD setup using github action: [Build script](https://github.com/ashrash/backendNode/blob/main/.github/workflows/docker-build-deploy.yml)
## Folder structure 
```
├── .github/workflows
├── src
│   ├── config
│   ├── controllers
│   ├── dtos
│   ├── interfaces
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── tests
│   ├── utils
│   ├── app.ts
│   └── index.ts
```


## Running App in DEV mode
Before running the below command set *DB_CONNECTION_STRING* env variable with the desired connection string.
``` 
#Install dependencies
npm i 

#Start app in dev mode. Default port: 3000
npm run dev 
```

## Running Tests
Make sure the app is running using the above command.
```
npm run test
```

## Swagger endpoint

``` http://localhost:3000/api-docs ```
