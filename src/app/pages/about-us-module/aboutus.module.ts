import { AboutUsRoutingModule } from './aboutus.routing';
import { AboutUsComponent } from './aboutus.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    AboutUsRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    AboutUsComponent
  ],
  providers: []
  
})
export class AboutUsModule { }
