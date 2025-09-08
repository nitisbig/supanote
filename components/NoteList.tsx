'use client';

import { useState, useEffect } from 'react';
import { EditIcon, DeleteIcon } from './Icons';

interface Note {
  id: string;
  title: string;
  text: string;
  date: string;
}

export default function NoteList({
  notes,
  onDelete,
  onEdit,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, text: string) => void;
}) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [items, setItems] = useState(notes);

  useEffect(() => setItems(notes), [notes]);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData('text/plain'));
    if (isNaN(from) || from === index) return;
    setItems((current) => {
      const updated = [...current];
      const [moved] = updated.splice(from, 1);
      updated.splice(index, 0, moved);
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (items.length === 0) {
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
        {items.map((note, index) => (
          <li
            key={note.id}
            className="note-item"
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop(index)}
            tabIndex={0}
          >
            <span className="note-title">{note.title}</span>
            <span className="note-date">
              {new Date(note.date).toLocaleDateString()}
            </span>
            <span className="note-text">{note.text}</span>
            <div className="note-actions">
              <button
                aria-label="Edit"
                onClick={() => {
                  const newTitle = prompt('Edit title', note.title);
                  if (newTitle === null) return;
                  const newText = prompt('Edit note', note.text);
                  if (newText !== null) {
                    onEdit(note.id, newTitle, newText);
                  }
                }}
              >
                <EditIcon width={16} height={16} />
              </button>
              <button aria-label="Delete" onClick={() => onDelete(note.id)}>
                <DeleteIcon width={16} height={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
