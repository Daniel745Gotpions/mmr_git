import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';



import { DisplayChangeComponent } from './display-change/display-change.component';
import { CreateChangeComponent } from './create-change/create-change.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {OrderModule} from "ngx-order-pipe";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DisplayChangeComponent,
    CreateChangeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
 //   Ng2OrderModule,
    NgxPaginationModule,
    FormsModule,
    OrderModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
