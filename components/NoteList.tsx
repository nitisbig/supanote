'use client';

import { useState } from 'react';

interface Note {
  id: string;
  text: string;
}

export default function NoteList({
  notes,
  onDelete,
  onEdit,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <>
      <div className="view-toggle">
        <button onClick={() => setView('grid')} disabled={view === 'grid'}>
          Grid
        </button>
        <button onClick={() => setView('list')} disabled={view === 'list'}>
          List
        </button>
      </div>
      <ul className={`notes-container ${view}`}>
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <span className="note-text">{note.text}</span>
            <div className="note-actions">
              <button
                onClick={() => {
                  const newText = prompt('Edit note', note.text);
                  if (newText !== null) {
                    onEdit(note.id, newText);
                  }
                }}
              >
                Edit
              </button>
              <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
