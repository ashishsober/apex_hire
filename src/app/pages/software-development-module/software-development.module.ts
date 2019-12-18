import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SoftwareDevelopmentRoutingModule } from './software-development.routing';
import { SoftwareDevelopmentComponent } from './software-development.component';
@NgModule({
  imports: [
    SoftwareDevelopmentRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    SoftwareDevelopmentComponent
  ],
  providers: []
  
})
export class SoftwareDevelopmentModule { }
