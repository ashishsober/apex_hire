import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppEngineDevelopmentComponent } from './app-engine-development.component';
const routes: Routes = [{
  path: '',
  component: AppEngineDevelopmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppEngineDevelopmentRoutingModule { }
