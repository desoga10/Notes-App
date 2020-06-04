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
  filteredNotes: Note[] = new Array<Note>();
  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>

  constructor(private noteService: NotesService) { }

  ngOnInit()  {
   this.notes = this.noteService.getAll()
   this.filteredNotes = this.notes;
    this.filter('')
   console.log(this.filteredNotes)
  }

  

  deleteNote(note : Note){
    alert("Are You Sure You Want To Delete This Note")
    let noteId = this.noteService.getId(note)
    this.noteService.delete(noteId);

    this.filter(this.filterInput.nativeElement.value)
    console.log("Note Deleted")
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    //split up the search query into individual words
    let terms: string[] = query.split(' '); //split on spaces
    //remove duplicate search items
    terms = this.removeDuplicate(terms)
    //Compile All Relevant Results inot The New Results Array
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      //Append results to allresults array
      allResults = [...allResults, ...results] 
      console.log(allResults)
    })

    //All results should include duplicate note
    //Because a single note could be the result of so many search terms.
    //But duplicate notes will not be shown in the UI
    //So, we remove the duplicates.

    let uniqueNotes = this.removeDuplicate(allResults);
    this.filteredNotes = uniqueNotes;

    //Sort By Relevence
    this.sortByRelevance(allResults)
  }

  removeDuplicate(arr: Array<any>) : Array<any>{
    let uniqueResults: Set<any> = new Set<any>();

    //Loop through the input array and addthe items to the set
    arr.forEach(e =>  uniqueResults.add(e));
    return Array.from(uniqueResults)
  }

  relevantNotes(query:string) : Array<Note>{
      query = query.toLowerCase().trim();
      let relevantNotes = this.notes.filter(note => {
        if(note.title &&  note.title.toLowerCase().includes(query)){
          return true;
        } 
          if(note.body && note.body.toLowerCase().includes(query)){
            return true;
          }
          return false;
        
      })
      return relevantNotes
  }

  sortByRelevance(searchResults: Note[]){
    //This method will return the relevance of the search results based on the number of times they appear in the search result
    let noteCountObj: Object =  {}; 
    searchResults.forEach(note  => {
      let noteId = this.noteService.getId(note); //Get Note Id

      if(noteCountObj[noteId]){
          noteCountObj[noteId] += 1; 
      } else {
        noteCountObj[noteId] = 1;
      }
    })
    this.filteredNotes = this.filteredNotes.sort((a: Note, b:Note) => {
      let aId = this.noteService.getId(a)
      let bId = this.noteService.getId(b)

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId]

      return bCount - aCount;
    })
  }

}
