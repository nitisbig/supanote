'use client';

import { useNotes } from '@/context/NotesContext';

export default function NoteList() {
  const { notes, remove } = useNotes();

  if (notes.length === 0) {
    return <p className="text-gray-500">No notes yet</p>;
  }

  return (
    <ul className="space-y-2">
      {notes.map((n) => (
        <li key={n.id} className="border p-2 rounded">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{n.title}</h3>
              <p>{n.content}</p>
            </div>
            <button onClick={() => remove(n.id)} className="text-red-600">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

