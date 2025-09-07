'use client';

import { useState, FormEvent } from 'react';

export default function NoteForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note"
      />
      <button type="submit">Add</button>
    </form>
  );
}
