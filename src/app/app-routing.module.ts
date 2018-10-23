import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingJsonComponent } from './loading-json/loading-json.component';
import { EasyTableComponent } from './easy-table/easy-table.component';
import {DataTableComponent} from './data-table/data-table.component'
const routes: Routes = [
  { path: '', component: LoadingJsonComponent },
  {path: 'easytable', component: EasyTableComponent},
  {path: 'datatable', component: DataTableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
