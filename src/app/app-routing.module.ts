import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component'
import  {DisplayChangeComponent} from './display-change/display-change.component'
import  {CreateChangeComponent} from './create-change/create-change.component'
import  {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'display-change/:id', component: DisplayChangeComponent },
  { path: 'create-change', component: CreateChangeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
