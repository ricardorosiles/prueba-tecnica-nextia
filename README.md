# Prueba tecnica Nextia

<p align="center">
  <img src="https://img.shields.io/badge/node.js-20.10.0-green" alt="NodeJS Version" />
  <img src="https://img.shields.io/badge/npm-10.2.3-red" alt="NPM Version" />

</p>

# Skills:

[![My Skills](https://skillicons.dev/icons?i=ts,postgresql,nodejs,express,jest,js,firebase,docker,git)](https://skillicons.dev)

## Getting started

## Requirements

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker Compose](https://docs.docker.com/compose/install/)
3. Install [NVM](https://github.com/nvm-sh/nvm)
4. Install [Yarn](https://yarnpkg.com/getting-started/install) or NPM

## Installation

1. Run this commands in the root project terminal

```bash
$ nvm use
$ yarn
```

1. Prepare your local environment creating the `<ENVIRONMENT>.env` file from `.env.example`
2. For local environment, you could need create the different services of infrastructure, in this case we use docker, so, use a terminal window and run the next command:

```bash
$ npm run start:docker
```

## Running the project

```bash
# development mode
$ yarn start
```

## Environments

Environment variables based on the name of the .env file, depending on the execution mode NODE_ENV.

```
- development.env
```

### Environment Variables

```bash

# Application
- NODE_ENV
- PORT

# Database
- DATABASE_NAME
- DATABASE_USERNAME
- DATABASE_PASSWORD
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_DIALECT
- DATABASE_SCHEMA

# DB viewer
- DATABASE_VIEWER_PORT

- FUNCTIONS_API_KEY
- TEST_EMAIL

PRIVATE_KEY

```

## Testing

```bash
# unit test
$ yarn test

# unit test coverage
$ yarn test:cov
```

## Migration Sequelize

```bash
# Create file for migration with name
$ yarn migration:create example_name_migration

# Applied migration
$ yarn migration:all

# Revert last applied migration
$ yarn migration:undo
```

## ENDPOINTS

```bash
POST = http://localhost:9000/v1/auth/sign-up/email

EXAMPLE BODY
{
    "name":"ricardo",
    "last_name":"rosiles",
    "email":"ricardo.rosiles@gmail.com",
    "password":"Password1@",
    "department_number":"123456"
}


POST = http://localhost:9000/v1/auth/token

{
    "email":"ricardo.rosiles1@gmail.com",
    "password":"Password1@"
}

PATCH = http://localhost:9000/v1/auth/recovery-password

{
    "email":"ricardo.rosiles08@gmail.com",
    "password":"Password1."
}


=================================================================================

SE TENDRA QUE REALIZAR UN LOGIN PARA PODER EJECUTAR EL ENDPOINT YA QUE ESTA PROTEGIDO

1.- Abrir Postman
2.- Dirigirse al apartado de Authorization
3.- Seleccionar el type que es Bearer Token
4.- Colocar Token del login previo

=================================================================================

POST = http://localhost:9000/v1/invitation

{
    "name":"Tst",
    "invitation_time":"",
    "invitation_expiration_date":"",
    "description":""
}
GET = http://localhost:9000/v1/invitation/:id

GET = http://localhost:9000/v1/invitation

PUT = http://localhost:9000/v1/invitation

DELETE = http://localhost:9000/v1/invitation/:id

=================================================================================

```

---

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name

Choose a self-explaining name for your project.

## Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Usage

Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

## License

For open source projects, say how it is licensed.

## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
