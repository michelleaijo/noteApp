import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private idCounter = 1;

  constructor() {}

  getNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  addNote(title: string, content: string) {
    const newNote: Note = {
      id: this.idCounter++,
      title,
      content,
      createdAt: new Date()
    };
    this.notes.push(newNote);
  }

  updateNote(id: number, title: string, content: string) {
    const note = this.getNoteById(id);
    if (note) {
      note.title = title;
      note.content = content;
    }
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
