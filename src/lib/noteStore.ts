import { Note } from '@/types/note';

export function createNote(data: Omit<Note, 'id' | 'createdAt'>): Note {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...data,
  };
}

export function addNote(notes: Note[], note: Note): Note[] {
  return [...notes, note];
}

export function removeNote(notes: Note[], id: string): Note[] {
  return notes.filter((n) => n.id !== id);
}

