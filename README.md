## Description

[Nest](https://github.com/nestjs/nest) social network learning project.

## Project setup

Create a .env with your database url and your JWT secret key:
```
DATABASE_URL=postgres://username:password@localhost:5432/db_name
JWT_SECRET="this is a secret"
```

Then you can start installing project:
```bash
$ npm install
$ npx prisma generate
$ npx prisma migrate dev --name init
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```