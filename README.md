# DurHack 2025 Website

This repository is the latest website for DurHack.

We're hosting the `client` project using Netlify at [durhack.com](https://durhack.com).
Any changes to the `main` branch are deployed automatically. 

The `archive/xyz` branches are also deployed using Netlify.

We're hosting the `server` project on an IONOS VPS at [api.durhack.com](https://api.durhack.com).
Changes to the `main` branch are **not** deployed automatically.

## Setup for Contributors

1. Complete [durhack-nginx](https://github.com/ducompsoc/durhack-nginx) setup
2. Install a local PostgreSQL server instance
3. Open a `psql` interactive session: `sudo -u postgres psql`
4. Create a new user, e.g. `durhack` in your PostgreSQL instance with the `CREATEDB` permission
   ```sql
   CREATE USER durhack WITH PASSWORD 'durhack' CREATEDB;
   -- or
   CREATE USER durhack WITH PASSWORD 'durhack';
   ALTER ROLE durhack WITH CREATEDB;
   ```
5. In the `common` directory, run `pnpm build`
6. In the `server` directory, create a `.env` file (edit to reflect your database user/password):
   ```dotenv
   DATABASE_URL="postgresql://durhack:durhack@localhost:5432/durhack?schema=public"
   ```
7. In the `server/config` directory, create a `local.ts` file (ask DurHack chief tech officer for a real client secret):
   ```ts
   import type { ConfigIn } from "@/config/schema"
   import type { DeepPartial } from "@/types/deep-partial"
  
   export default {
     keycloak: {
       clientId: "api.durhack-dev.com",
       clientSecret: "not-a-real-client-secret",
    },
   } satisfies DeepPartial<ConfigIn>
   ```
8. In the `server` directory, run `pnpm exec prisma migrate dev`
9. In the `server` directory, run `pnpm generate`

## Questions, Comments and Concerns
Drop us a line at [hello@durhack.com](mailto:hello@durhack.com)!
