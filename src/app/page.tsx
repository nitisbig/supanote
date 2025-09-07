import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';
import { NotesProvider } from '@/context/NotesContext';

export default function Home() {
  return (
    <NotesProvider>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Supanote</h1>
        <NoteForm />
        <div className="my-4" />
        <NoteList />
      </main>
    </NotesProvider>
  );
}

