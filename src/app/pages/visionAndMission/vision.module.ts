import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { VisionComponent } from './vision.component';
import { VisionRoutingModule } from './vision.routing';
@NgModule({
  imports: [
    VisionRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    VisionComponent
  ],
  providers: []
  
})
export class VisionModule { }
