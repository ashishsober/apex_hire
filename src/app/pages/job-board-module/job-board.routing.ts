import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobBoardComponent } from './job-board.component';

const routes: Routes = [{
  path: '',
  component: JobBoardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobBoardRoutingModule { }
