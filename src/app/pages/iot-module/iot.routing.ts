import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IOTComponent } from './iot-component';

const routes: Routes = [{
  path: '',
  component: IOTComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IOTRoutingModule { }
