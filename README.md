# Supanote

A simple note-taking app built with Next.js. It lets you add and remove notes client-side.

## Development

```bash
npm install
npm run dev
```

## Database

This project uses Supabase to persist notes. You must create the `notes` table before saving notes will work:

1. Create a Supabase project or start the Supabase CLI.
2. Run the SQL in `supabase/migrations/0001_create_notes_table.sql` using the dashboard or `supabase db push`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your environment.

Once the table exists and the environment variables are configured, the app can save notes without errors.
