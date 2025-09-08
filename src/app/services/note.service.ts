import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SummaryResponse {
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private idCounter = 1;

  private summaryApiUrl = 'http://localhost:3000/summary'; // backend endpoint

  constructor(private http: HttpClient) {}

  // -------- Notes CRUD --------
  getNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  addNote(title: string, content: string): Note {
    const newNote: Note = {
      id: this.idCounter++,
      title,
      content,
      createdAt: new Date(),
      summary: '' // initialize summary
    };
    this.notes.push(newNote);
    return newNote;
  }

  updateNote(id: number, title: string, content: string): void {
    const note = this.getNoteById(id);
    if (note) {
      note.title = title;
      note.content = content;
      note.summary = ''; // reset summary when note changes
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  // -------- AI Summary --------
  getSummary(content: string): Observable<SummaryResponse> {
    return this.http.post<SummaryResponse>(this.summaryApiUrl, { content });
  }

  // Optional helper to update a note's summary after fetching from AI
  summarizeNote(noteId: number): void {
    const note = this.getNoteById(noteId);
    if (!note) return;

    this.getSummary(note.content).subscribe({
      next: (res) => {
        note.summary = res.summary;
      },
      error: (err) => {
        console.error('Failed to fetch summary:', err);
      }
    });
  }
}
