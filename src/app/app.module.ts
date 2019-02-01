import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableExComponent } from './table-ex/table-ex.component';
import { CustomHeaderGroupTableComponent } from './custom-header-group-table/custom-header-group-table.component';
import { CustomHeaderGroupComponent } from './custom-header-group-table/custom-header-group/custom-header-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TableExComponent,
    CustomHeaderGroupTableComponent,
    CustomHeaderGroupComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([CustomHeaderGroupComponent]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
