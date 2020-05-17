import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/shared/notes.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  notes: Note[] = new Array<Note>()

  constructor(private noteService: NotesService) { }

  ngOnInit()  {
   this.notes = this.noteService.getAll()
   console.log(this.notes)
  }

  

  deleteNote(id: number){
    alert("Are You Sure You Want To Delete This Note")
    this.noteService.delete(id);
    console.log("Note Deleted")
  }

}
