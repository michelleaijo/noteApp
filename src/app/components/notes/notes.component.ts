import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;

  // form inputs
  title = '';
  content = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.notes = this.noteService.getNotes();
  }

  addNote() {
    if (this.title.trim() && this.content.trim()) {
      this.noteService.addNote(this.title, this.content);
      this.title = '';
      this.content = '';
      this.loadNotes();
    }
  }

  editNote(note: Note) {
    this.selectedNote = { ...note }; // copy so editing doesn't affect directly
    this.title = note.title;
    this.content = note.content;
  }

  updateNote() {
    if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote.id, this.title, this.content);
      this.selectedNote = null;
      this.title = '';
      this.content = '';
      this.loadNotes();
    }
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
    this.loadNotes();
  }

  cancelEdit() {
    this.selectedNote = null;
    this.title = '';
    this.content = '';
  }
}
