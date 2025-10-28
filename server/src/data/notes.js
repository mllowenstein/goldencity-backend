import {v4} from 'uuid';

class NotesDB {
  constructor() {
    this.notes = new Map();
    this.initializeSampleData();
  }

  initializeSampleData() {
    const notes = [
      {
        id: v4(),
        title: 'Welcome to Notes API',
        content:
          'This is your first note. You can create, read, update, and delete notes.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: v4(),
        title: 'Getting Started',
        content: 'Use the API endpoints to manage your notes efficiently.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    notes.forEach((note) => this.notes.set(note.id, note));
  }

  async getAllNotes() {
    return Array.from(this.notes.values());
  }

  async getNoteById(id) {
    return this.notes.get(id) || null;
  }

  async createNote(data) {
    const newNote = {
      id: v4(),
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.notes.set(newNote.id, newNote);
    return newNote;
  }

  async updateNote(id, data) {
    const note = this.notes.get(id);

    if (!note) {
      return null;
    }

    const updatedNote = {
      ...note,
      ...(data.title && { title: data.title }),
      ...(data.content && { content: data.content }),
      updatedAt: new Date().toISOString(),
    };

    this.notes.set(id, updatedNote);
    return updatedNote;
  }

  async deleteNote(id) {
    const note = this.notes.get(id);

    if (!note) {
      return null;
    }

    this.notes.delete(id);
    return note;
  }

  async clearAll() {
    this.notes.clear();
  }

  async getCount() {
    return this.notes.size;
  }
}

// Export singleton instance
export const db = new NotesDB();
export default db;
