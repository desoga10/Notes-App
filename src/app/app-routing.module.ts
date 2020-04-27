import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteListComponent } from './pages/note-list/note-list.component';
import { LayoutComponent } from './structure/layout/layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';


const routes: Routes = [
  {path: '', component: LayoutComponent, children : [
    {path: '', component: NoteListComponent},
    {path: 'new', component: NoteDetailsComponent},
    {path: ':id', component: NoteDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
