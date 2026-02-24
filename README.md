# ERP Backend

## Folder Structure

```txt
.
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── nest-cli.json
├── package.json
├── prisma
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations
│       └── 20260224000000_init
│           └── migration.sql
└── src
    ├── app.module.ts
    ├── main.ts
    ├── prisma
    │   ├── prisma.module.ts
    │   └── prisma.service.ts
    ├── common
    │   ├── decorators
    │   ├── filters
    │   ├── guards
    │   └── middleware
    ├── auth
    ├── users
    ├── companies
    ├── audit
    └── modules
        ├── sales
        ├── accounting
        ├── hr
        ├── marketing
        ├── website
        ├── projects
        ├── pos
        ├── documents
        └── reporting
```

## Setup

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
npm run start:dev
```

## API

- Base URL: `/api/v1`
- Swagger: `/docs`
- Branding assets: `public/assets/visa-matrix-logo.svg`
- Swagger theme: `src/branding/swagger-theme.css`
