'use client';

import { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { supabase } from '../lib/supabase';

interface Note {
  id: string;
  text: string;
}

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      const { data, error } = await supabase.from('notes').select();
      if (error) {
        console.error('Failed to load notes:', error);
        alert(`Failed to load notes: ${error.message}`);
        return;
      }
      setNotes(data ?? []);
    }
    loadNotes();
  }, []);

  async function addNote(text: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('notes')
      .insert({ text })
      .select()
      .single();
    if (error) {
      console.error('Failed to save note:', error);
      alert(`Failed to save note: ${error.message}`);
      return false;
    }
    setNotes((current) => [...current, data]);
    return true;
  }

  async function deleteNote(id: string) {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete note:', error);
      alert(`Failed to delete note: ${error.message}`);
      return;
    }
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  async function editNote(id: string, text: string): Promise<boolean> {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const { error } = await supabase
      .from('notes')
      .update({ text: trimmed })
      .eq('id', id);
    if (error) {
      console.error('Failed to update note:', error);
      alert(`Failed to update note: ${error.message}`);
      return false;
    }
    setNotes((current) =>
      current.map((note) => (note.id === id ? { ...note, text: trimmed } : note))
    );
    return true;
  }

  return (
    <main>
      <h1>Notes</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </main>
  );
}
