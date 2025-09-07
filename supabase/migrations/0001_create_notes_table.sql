-- Enable extension needed for UUID generation
create extension if not exists "pgcrypto";

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  created_at timestamp with time zone default now()
);
