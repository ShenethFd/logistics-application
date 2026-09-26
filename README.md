# RotaFlow Logistics Operations

Responsive React JavaScript application for shipment, security, goods acceptance, and regional depotst teams. It includes role-aware navigation, shipment status transitions, driver statistics, regional routing, Supabase authentication, row-level security, audit history, notifications, and realtime updates.

## Run locally

```bash
npm install
npm run dev
```

Without Supabase environment variables the app uses in-memory demo data. Every demo account uses password `demo123`; select a role on the login page.

## Connect Supabase

1. Create a Supabase project and run `npx supabase init` if using the CLI.
2. Link it with `npx supabase link --project-ref YOUR_PROJECT_REF`.
3. Apply `supabase/migrations/001_initial_schema.sql` with `npx supabase db push`.
4. Create users in Supabase Authentication, then insert matching `profiles` rows. Never expose the service-role key in the browser.
5. Copy `.env.example` to `.env.local` and add the project URL and anonymous key.
6. Optionally run `supabase/seed.sql` in the SQL editor.

The database enforces regional visibility and status permissions through RLS and a guarded trigger. UI permissions improve usability but are not the security boundary.

## Rolees

| Rolee | Scope |
| --- | --- |
| Admin | All data, users, and status transitions |
| Shipment Team | Create shipments; move vehicles to ramp and shipped |
| Security Team | View shipments; call waiting vehicles and mark arrivals |
| Goods Acceptance Team | View shipments; acknowledge arrivals or delivery failures |
| Regional | View and manage shipments tied to the assigned region |

## Commands

- `npm run dev` — development server
- `npm run build` — production build
- `npm run test` — component tests
- `npm run lint` — JavaScript lint
- `npm run preview` — preview production build

## Structure

```text
src/components  shared navigation, status, and form UI
src/context     controlled authentication and data state
src/data        demo users, shipments, drivers, and regions
src/lib         Supabase client
src/pages       login, overview, shipment, driver, region, users
supabase        schema, policies, triggers, realtime, and seed data
```
