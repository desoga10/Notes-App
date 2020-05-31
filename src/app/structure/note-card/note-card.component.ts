import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/shared/notes.model';
import { NotesService } from 'src/app/shared/notes.service';
import {trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  animations: [
    trigger('itemAnim', [
      //Entry Animation
      transition('void => *', [
        //Initial State
        style({
          height: 0,
          opacity: 0,
          transform : 'scale(0.85)',
          'margin-bottom': 0,
          //Due To A Browser Bug, We Have To Expand Out Padding Properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        //Animate Spacing Which Includes Height & Margin
        animate('50ms', style ({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(300)
      ]),
      transition('* => void', [
        //First Scale Up
        animate(50, style ({
          transform: 'scale(1.05)'
        })),
        //Then scale down to normal size when beginning to fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })), 
        //Scale Down And fadeouit completely
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        //Then Animate The Spacing Which Includes Height, Margin & Paddding
        animate('159ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0'

        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }), 
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ] )
    ])
  ]
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
