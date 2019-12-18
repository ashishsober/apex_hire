import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';
import { CareerService } from './career.service';

@NgModule({
  imports: [
    CareerRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    CareerComponent
  ],
  providers: [CareerService]
  
})
export class CareerModule { }
