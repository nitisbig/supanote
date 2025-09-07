import { NextResponse } from 'next/server';
import type { Note } from '@/types/note';

export async function POST(req: Request) {
  const note: Note = await req.json();
  const { Pool } = await import('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  await pool.query(
    'insert into notes (id, title, content, created_at) values ($1, $2, $3, to_timestamp($4 / 1000.0))',
    [note.id, note.title, note.content, note.createdAt]
  );
  return NextResponse.json({ success: true });
}
