-- define a SQL function for generating a random timestamp
CREATE OR REPLACE FUNCTION random_timestamp(
    "from" timestamp = timestamp '2024-07-01 00:00:00',
    "to" timestamp = timestamp '2024-10-28 00:00:00'
) RETURNS timestamp
    LANGUAGE SQL
    VOLATILE
    RETURN "from" + random() * ("to" - "from");

-- Delete everything from the "User" table, and everything with a foreign key constraint on the "User" table
TRUNCATE "User" CASCADE;

-- Generate 1200 'users'
INSERT INTO "User" (keycloak_user_id)
SELECT
    gen_random_uuid()
FROM generate_series(1, 1200);

-- For each 'user' create a submitted application
INSERT INTO "UserInfo" (user_id, application_status, application_submitted_at, updated_at)
SELECT
    keycloak_user_id,
    'submitted',
    random_timestamp(),
    timestamp '2024-07-01 00:00:00'
FROM "User";

-- Now test the `ticket-assigner`: `pnpm exec tsx src/ticket-assigner/main.ts`
