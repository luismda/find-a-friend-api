[![CI Unit Tests](https://github.com/luismda/find-a-friend-api/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/luismda/find-a-friend-api/actions/workflows/run-unit-tests.yml)
[![CI E2E Tests](https://github.com/luismda/find-a-friend-api/actions/workflows/run-e2e-tests.yml/badge.svg)](https://github.com/luismda/find-a-friend-api/actions/workflows/run-e2e-tests.yml)

---

# FindAFriend API 🐶

This project is a **Node.js REST API for pet adoption**, using authentication, fetching pets from a city, also using **SOLID principles**, some **Design Patterns** and **automated tests**. The project is a challenge developed on the Ignite Node.js trail - [**Rocketseat**](https://github.com/rocketseat-education) programming specialization bootcamp. 

To run the project on your machine, first clone the repository. Then install the dependencies.

```bash
  npm i
```

After that, run the command to start the docker container, and then run the prisma migrations command:

```bash
  # start docker container
  docker compose up -d

  # run all prisma migrations
  npx prisma migrate deploy
```

In addition to these steps, it is important to add the connection data with the **Supabase** service to the environment variables file. [Consult the documentation here](https://supabase.com/docs/reference/javascript/initializing). You can also follow the `.env.example` file as an example.

After cloning the repository and preparing the environment, look at the commands you can run:

```bash
  # start app in development
  npm run start:dev

  # build app
  npm run build

  # start app in production
  npm run start

  # run unit tests
  npm run test:unit

  # run e2e tests
  npm run test:e2e

  # generate test coverage
  npm run test:coverage
```

## More about the project 👀

The main idea of ​​this application is to help organizations that take care of pets that are available for adoption, in which organizations can register pets on the platform and publicize it. In this way, anyone interested in finding a friend can contact the organization to carry out the adoption.

### Stack

- Node.js
- TypeScript
- Fastify
- Zod
- Prisma ORM
- Docker
- Vitest
- SuperTest
- TSUP
- TSX
- ESLint

### Concepts, Methodologies and Design Patterns

- SOLID (Dependency Inversion Principle)
- Repository Pattern
- Factory Pattern
- TDD
- InMemoryTestDatabase

### Functional requirements

- It should be able to create a pet
- It should be able to fetch for all pets available for adoption in a city
- It should be able to filter pets by their traits
- It should be able to see the details of a pet available for adoption
- It should be able to register as an organization
- It should be able to authenticate as an organization
- It should be able to get details of an organization

### Business rules

- To list the pets, it is mandatory to inform the city
- A organizations need to have an address and WhatsApp number
- A pet should be related to an organization
- A pet should have at least one image
- A pet may or may not have requirements for adoption
- The user who wants to adopt will contact the organization via WhatsApp
- All filters except city are optional
- For an organization to access the application as admin, it needs to be logged in

### Non-functional requirements

- PostgreSQL database must be used for data persistence
- Images uploaded must be stored in an external service ([Supabase](https://supabase.com/))
- All application lists must have a maximum of 20 items per page
- The organization must be identified by a JWT (JSON Web Token)

### The basis of the project

This project was organized in a layered structure, starting with the HTTP layer (routes and controllers), then the use cases layer (features) and later the data persistence layer. In addition, the **SOLID Dependency Inversion principle** was used in conjunction with the **Repository Pattern**, to reduce coupling and gain flexibility, in addition to the **Factory Pattern**, which also helped in the abstraction of objects.

### HTTP layer

For the HTTP layer, **Fastify** was used, creating all the routes and controllers of the application, also using the plugins feature that Fastify offers. In addition, the **Zod** library was used to validate and transform the input data for each route. It was also possible to create a global error handling, provided by Fastify itself.

#### Supabase

In addition, pet images are stored in a **Supabase bucket**, which is a file storage service. In this way, the uploaded files do not occupy space on the same server as the application.

#### Refresh Token

The authentication technique used was **JWT (JSON Web Token)**. The **Refresh Token** technique is also used, that is, a second token is generated at the time of authentication, precisely to allow the request of a new token for a given route, so that when the access token expires it can be regenerated, without the need for the user to reauthenticate.

### Database

The database used was **PostgreSQL** together with **Prisma ORM**, which facilitated integration with the database and migration management, in addition to integrating perfectly with **TypeScript**. In addition, **Docker** was used to manage a **PostgreSQL** container with the **Docker Compose** tool.

### Tests

**Unit and end-to-end tests** were implemented in this application using the **Vitest** library. For the unit tests, the **InMemoryTestDatabase Pattern** was used, which simulates a database, but only in memory, thus making it possible to focus only on testing the functionality itself. In the end-to-end tests, a **Test Environment** was created through Vitest, to create a database for each group of tests, allowing to have a clean context to execute the tests. In addition, for the end-to-end tests, **SuperTest** was used, which made it possible to carry out requests for each route of the application.

Finally, the **TDD (Test Driven Development)** methodology was used in some use cases.

### CI (Continuous Integration)

Finally, a **CI workflow** was implemented using **GitHub Actions**, to run unit tests every time a push occurs on the main branch, and also to run end-to-end tests every time a pull request occurs in the repository.

## Created by

Luís Miguel | [**LinkedIn**](https://www.linkedin.com/in/luis-miguel-dutra-alves/)

##

**#NeverStopLearning 🚀**