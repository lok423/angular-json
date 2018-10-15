import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingJsonComponent } from './loading-json/loading-json.component';

const routes: Routes = [
  { path: '', component: LoadingJsonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
