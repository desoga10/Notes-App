import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  ngform: FormGroup
  constructor(private noteService : NotesService) { 
    this.ngform = new FormGroup({
      title: new FormControl(),
      body: new FormControl()
   });
  }

 

  ngOnInit(): void {
  }

  onSubmit(){
    //Save Note
    this.noteService.addNote(this.ngform.value)
  }

}
