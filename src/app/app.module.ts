import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './pages/note-list/note-list.component';
import { LayoutComponent } from './structure/layout/layout.component';
import { NoteCardComponent } from './structure/note-card/note-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    LayoutComponent,
    NoteCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
