import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IOTRoutingModule } from './iot.routing';
import { IOTComponent } from './iot-component'
@NgModule({
  imports: [
    IOTRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    IOTComponent
  ],
  providers: []
  
})
export class IOTModule { }
