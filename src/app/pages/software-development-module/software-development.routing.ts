import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoftwareDevelopmentComponent } from './software-development.component';

const routes: Routes = [{
  path: '',
  component: SoftwareDevelopmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoftwareDevelopmentRoutingModule { }
