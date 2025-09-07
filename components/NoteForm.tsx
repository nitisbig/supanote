'use client';

import { useState, FormEvent } from 'react';

export default function NoteForm({
  onAdd,
}: {
  // Return a boolean so the form knows whether the save succeeded.
  // This lets us avoid clearing the input on failure.
  onAdd: (text: string) => Promise<boolean>;
}) {
  const [text, setText] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const saved = await onAdd(trimmed);
    if (saved) {
      setText('');
    }
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
