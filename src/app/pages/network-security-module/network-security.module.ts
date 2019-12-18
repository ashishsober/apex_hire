import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NetworkSecurityComponent } from './network-security.component';
import { NetworkSecurityRoutingModule } from './network-security.routing';
@NgModule({
  imports: [
    NetworkSecurityRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    NetworkSecurityComponent
  ],
  providers: []
  
})
export class NetworkSecurityModule { }
