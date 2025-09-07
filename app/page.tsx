'use client';

import { useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

export default function Page() {
  const [notes, setNotes] = useState<string[]>([]);

  function addNote(text: string) {
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
