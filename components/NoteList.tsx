'use client';

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
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {note.text}
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
        </li>
      ))}
    </ul>
  );
}
