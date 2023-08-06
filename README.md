## Installation

Run the below command to install project dependencies packages.

```bash
npm install
```

## Docker

Run the docker compose file with the below command:

```bash
docker compose up development-db -d
```

If started correctly and running the first below command you can see your container. Get the container id and run the second command to see its logs. You should see, that the database is ready to accept connections.

```bash
docker ps
docker logs container-id-here
```

## Prisma

#### VS Code extension

Install the VS code prisma extension for syntax highlight and autocomplete.

#### Getting started

While developing a new project run below command

```bash
npx prisma init
```

To create migrations run the below command. It will generate the migrations folder in the prisma folder. Every next time we apply some changes to our rpisma schema we will run again this command to generate updated migrations.

```bash
npx prisma migrate dev
```

#### Previewing data

By running the below command, we will be given url on which we can inspect our data.

```bash
npx prisma studio
```

## Start the server

Run the below commands in the root folder of the project.

Run the below command to start the docker container and run the migrations. With Windows use the bash terminal, VS code terminal might not like the sleep command.

```bash
npm run dev:db:restart
```

Run the below command to start browser window, where you can inspect the data.

```bash
npm run dev:prisma:studio
```

Run the below command to start the dev server

```bash
npm run start:dev
```

## Testing

You can preview the test database with the following command

```bash
npx dotenv -e .env.test -- prisma studio
```

## Additional Dependencies

- `@nestjs/config` - configuration module. Used for getting .env variables
- `prisma` - database ORM
- `@prisma/client` - needed for prisma
- `argon2` - for hashing passwords
- `@nestjs/passport` - authentication
- `@nestjs/jwt` - authentication
- `passport` - authentication
- `passport-jwt` - authentication
- `@types/passport-jwt` - authentication
- `pactum` - testing
- `dotenv-cli` - allow us to import custom env files. In this case the .env.test file which is used for the e2e tests

## Scripts

### Custom

- `dev:prisma:dev` - run the migrations in dev environment based on the schema. The changes are applied automatically.
- `dev:prisma:deploy` - run the migrations in prod environment based on the schema. The changes are applied after the user confirms the prompt.
- `dev:db:remove` - remove the docker container
- `dev:db:start` - start the docker container
- `dev:db:restart` - remove the container, then start it, then run the migrations. The _timeout_ command is for Windows.
- `test:prisma:deploy` - run the migrations using the test env file
- `test:db:remove` - remove the docker container used for running the e2e tests
- `test:db:start` - start the docker container used for running the e2e tests
- `test:db:restart` - remove the container, then start it, then run the migrations for e2e test. The _timeout_ command is for Windows.
- `pretest:e2e` - before running the script `test:e2e` run the script `test:db:restart`
- `posttest:e2e` - after running the script `test:e2e` run the script `test:db:remove`

### Default

- `start` - start the project
- `start:dev` - start the project in watch mode to watch for file changes
- `test:e2e` - run e2e tests

### Scripts specifics

- for this script `test:prisma:deploy` we will use the help of dotenv-cli dev dependency package to use different env file.
