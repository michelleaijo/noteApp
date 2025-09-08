import { Component } from '@angular/core';
import { NoteService } from './../../services/note.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  title = '';
  content = '';
  selectedNote: Note | null = null;

  constructor(public noteService: NoteService) {} // make public to use in template

  get notes(): Note[] {
    return this.noteService.getNotes();
  }

  addNote() {
    this.noteService.addNote(this.title, this.content);
    this.title = '';
    this.content = '';
  }

  editNote(note: Note) {
    this.selectedNote = note;
    this.title = note.title;
    this.content = note.content;
  }

  updateNote() {
    if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote.id, this.title, this.content);
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.selectedNote = null;
    this.title = '';
    this.content = '';
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note.id);
  }

  summarizeNote(note: Note) {
    this.noteService.summarizeNote(note.id);
  }
}
