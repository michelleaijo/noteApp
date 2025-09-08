import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent {
  title = '';
  content = '';

  constructor(private noteService: NoteService) {}

  saveNote() {
    if (this.title.trim() && this.content.trim()) {
      this.noteService.addNote(this.title, this.content);
      this.title = '';
      this.content = '';
    }
  }
}
