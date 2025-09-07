'use client';

import { useState, FormEvent } from 'react';
import { PlusIcon } from './Icons';

export default function NoteForm({
  onAdd,
}: {
  onAdd: (text: string) => Promise<boolean>;
}) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
    setText('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const saved = await onAdd(trimmed);
    if (saved) {
      close();
    }
  }

  return (
    <>
      <button type="button" className="fab" onClick={() => setOpen(true)}>
        <PlusIcon width={24} height={24} />
      </button>
      {open && (
        <div className="modal-overlay" onClick={close}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a note"
            />
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
