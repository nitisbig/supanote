'use client';

import { useState, FormEvent } from 'react';
import { PlusIcon } from './Icons';

export default function NoteForm({
  onAdd,
}: {
  onAdd: (title: string, text: string) => Promise<boolean>;
}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
    setTitle('');
    setText('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();
    if (!trimmedText && !trimmedTitle) return;
    const saved = await onAdd(trimmedTitle, trimmedText);
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
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
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
