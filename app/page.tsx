'use client';

import { useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { supabase } from '../lib/supabase';

export default function Page() {
  const [notes, setNotes] = useState<string[]>([]);

  async function addNote(text: string) {
    const { error } = await supabase.from('notes').insert({ text });
    if (error) {
      alert('Failed to save note');
      return;
    }
    setNotes([...notes, text]);
  }

  function deleteNote(index: number) {
    setNotes(notes.filter((_, i) => i !== index));
  }

  return (
    <main>
      <h1>Notes</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </main>
  );
}
