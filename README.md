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

Install the VS code prosma extension for syntax highlight and autocomplete.

#### Getting started

While developing a new project run below command

```bash
npx prisma init
```

To create migrations run the below command. It will generate the migrations folder in the prisma folder.

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

Run the below command to start the docker container and run the migrations.

```bash
npm run dev:database:restart
```

Run the below command to start browser window, where you can inspect the data.

```bash
npm run dev:prisma:studio
```

Run the below command to start the dev server

```bash
npm run start:dev
```
