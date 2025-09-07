'use client';

export default function NoteList({ notes, onDelete }: { notes: string[]; onDelete: (index: number) => void }) {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <ul>
      {notes.map((note, i) => (
        <li key={i}>
          {note}
          <button onClick={() => onDelete(i)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
