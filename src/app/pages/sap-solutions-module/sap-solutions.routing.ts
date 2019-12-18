import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SapSolutionsComponent } from './sap-solutions.component';

const routes: Routes = [{
  path: '',
  component: SapSolutionsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SapSolutionRoutingModule { }
