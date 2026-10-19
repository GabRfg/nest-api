# Courses API — NestJS + TypeORM

REST API for managing courses and their tags, built to learn NestJS in depth: modules and dependency injection, DTO validation, TypeORM relations and migrations, and both unit and end-to-end testing.

**Stack:** NestJS 11 · TypeScript · TypeORM · PostgreSQL · class-validator · Jest · Supertest

> Study project based on a NestJS course, extended and documented as I went. Focus is on the patterns, not on the domain.

---

## What it does

- Full CRUD for **courses** (`name`, `description`, `tags`)
- **Many-to-many** relation between courses and tags through a pivot table
- Tags are sent as plain names (`["nestjs", "typescript"]`); existing tags are reused and new ones are created automatically
- Request validation with a global `ValidationPipe` — unknown fields are rejected (`whitelist` + `forbidNonWhitelisted`) and payloads are transformed into DTO instances
- Proper HTTP semantics: `404` for unknown IDs, `204` on delete

## What I practiced

| Topic | Where |
| --- | --- |
| Modules, controllers, providers and DI | `src/courses/` |
| DTOs with `class-validator` and `PartialType` for updates | `src/courses/dto/` |
| Entities with UUID keys and `@ManyToMany` + cascade | `src/courses/entities/` |
| Async DB config from environment with `@nestjs/config` | `src/database/database.module.ts` |
| Versioned migrations (`synchronize: false`) | `src/migrations/`, `src/database/orm-cli-config.ts` |
| Unit tests with mocked repositories | `src/courses/courses.service.spec.ts` |
| E2E tests against a real database with Supertest | `src/courses/courses.controller.e2e-spec.ts` |
| Git flow with `develop` branch and pull requests | commit history |

## Running locally

**Requirements:** Node.js 20+ and PostgreSQL.

```bash
git clone https://github.com/GabRfg/nest-api.git
cd nest-api
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=courses
PORT=3000
```

Run the migrations, then start the app:

```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/database/orm-cli-config.ts
npm run start:dev
```

## Endpoints

| Method | Route | Description |
| --- | --- | --- |
| GET | `/courses` | List courses with their tags |
| GET | `/courses/:id` | Get one course |
| POST | `/courses` | Create a course |
| PUT | `/courses/:id` | Update a course (partial) |
| DELETE | `/courses/:id` | Delete a course (`204`) |

```json
POST /courses
{
  "name": "NestJS Fundamentals",
  "description": "Modules, DI and TypeORM",
  "tags": ["nestjs", "typescript"]
}
```

## Tests

```bash
npm run test      # unit tests (repositories mocked)
npm run test:e2e  # end-to-end, hits the database in .env
npm run test:cov  # coverage report
```

> The e2e suite uses the same `DB_*` variables as the app — point them to a disposable database before running it.

## Next steps

- [ ] Docker Compose with PostgreSQL for one-command setup
- [ ] Separate test database configuration
- [ ] Pagination on `GET /courses`
- [ ] Swagger / OpenAPI documentation
