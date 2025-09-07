import { describe, it, expect } from 'vitest';
import { addNote, createNote, removeNote } from './noteStore';

describe('noteStore', () => {
  it('adds and removes a note', () => {
    const note = createNote({ title: 'test', content: 'hello' });
    let notes = addNote([], note);
    expect(notes).toHaveLength(1);
    notes = removeNote(notes, note.id);
    expect(notes).toHaveLength(0);
  });
});

