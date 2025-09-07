import { NextResponse } from 'next/server';
import type { Note } from '@/types/note';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const note: Note = await req.json();
  const { error } = await supabase.from('notes').insert({
    id: note.id,
    title: note.title,
    content: note.content,
    created_at: new Date(note.createdAt).toISOString(),
  });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
