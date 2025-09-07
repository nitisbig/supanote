'use client';

import { useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { supabase } from '../lib/supabase';

export default function Page() {
  const [notes, setNotes] = useState<string[]>([]);

  async function addNote(text: string): Promise<boolean> {
    // Supabase expects an array of objects for inserts. Sending a plain
    // object causes an error and the note is not saved.
    const { error } = await supabase.from('notes').insert([{ text }]);
    if (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note');
      return false;
    }
    // Use functional update to avoid stale state when adding notes
    setNotes((current) => [...current, text]);
    return true;
  }

  function deleteNote(index: number) {
    setNotes((current) => current.filter((_, i) => i !== index));
  }

  return (
    <main>
      <h1>Notes</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </main>
  );
}
