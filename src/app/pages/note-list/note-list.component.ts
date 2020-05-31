import { Component, OnInit } from '@angular/core';
import {trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  animations: [
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
export class NoteListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
