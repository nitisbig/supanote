'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createNote, addNote, removeNote } from '@/lib/noteStore';
import { Note } from '@/types/note';

interface NotesContextValue {
  notes: Note[];
  add: (title: string, content: string) => Promise<void>;
  remove: (id: string) => void;
}

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('notes');
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const add = async (title: string, content: string) => {
    const note = createNote({ title, content });
    setNotes((prev) => addNote(prev, note));
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const remove = (id: string) => {
    setNotes((prev) => removeNote(prev, id));
  };

  return (
    <NotesContext.Provider value={{ notes, add, remove }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};

