import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkSecurityComponent } from './network-security.component';

const routes: Routes = [{
  path: '',
  component: NetworkSecurityComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkSecurityRoutingModule { }
