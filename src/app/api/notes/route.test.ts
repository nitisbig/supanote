import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/notes/route';
import type { Note } from '@/types/note';

describe('POST /api/notes', () => {
  it('returns success when Supabase is not configured', async () => {
    const note: Note = {
      id: '1',
      title: 'Test',
      content: 'Content',
      createdAt: Date.now(),
    };
    const req = new Request('http://localhost/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
  });
});
