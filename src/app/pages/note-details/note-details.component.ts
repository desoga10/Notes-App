import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Note } from 'src/app/shared/notes.model';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  title: "alleluyah"
  note: Note;
  noteId: number;
  new: boolean
  ngform: FormGroup;
  noteData;
  constructor(private noteService : NotesService, private router: Router, private actvroute: ActivatedRoute) { 
    this.ngform = new FormGroup({
      title: new FormControl(),
      body: new FormControl()
   });
  }

 

  ngOnInit() {
    //To Check If New Note Is Being Created or Edited
    this.actvroute.params.subscribe( (params: Params) => {
      this.note = new Note()
      if(params.id){     
        this.note = this.noteService.get(params.id);
        this.noteId = params.id;
        this.new = false
      } else {
        this.new = true
      }
    })
  }

  onSubmit(){
    console.log(this.noteId)
    if(this.new){
    //Save Note
    console.log(this.ngform.value)
    console.log("defined")
    this.noteService.addNote(this.ngform.value)
    let saveNote: any = this.ngform.value
    setTimeout(() => {
      localStorage.setItem('addNoteTitle', this.ngform.value.title);
      localStorage.setItem('addNoteBody', this.ngform.value.body);
    }, 2000);

    } else {
     this.noteService.update(this.noteId, this.ngform.value.title, this.ngform.value.body)
     console.log("undefined")
    }
    this.router.navigateByUrl('/')
  }

  cancel(){
    this.router.navigateByUrl('/')
  }

}
