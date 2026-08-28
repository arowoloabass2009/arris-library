# Arris Library — Database Migrations

Run these in your Supabase SQL Editor in order:

1. `001_initial_schema.sql` — Creates all tables, triggers and indexes
2. `002_rls_policies.sql` — Sets up Row Level Security policies
3. `003_seed_data.sql` — (Optional) Seeds initial announcements

## Supabase Project Details

- **Project URL:** `https://vpfjwievtbbgepwlogls.supabase.co`
- **Tables:** `books`, `training_courses`, `announcements`, `contact_messages`, `device_sessions`

## Notes

- All tables use `uuid_generate_v4()` for primary keys
- Books and courses are publicly readable when `is_published = TRUE`
- Admin actions (create/update/delete) work via the anon key since RLS allows it
- Device sessions are tracked per unique device ID (no auth required)
- Contact messages can be inserted by anyone but only read by the service
