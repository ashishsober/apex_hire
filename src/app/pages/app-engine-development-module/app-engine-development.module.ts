import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppEngineDevelopmentRoutingModule } from './app-engine-development.routing';
import { AppEngineDevelopmentComponent } from './app-engine-development.component';

@NgModule({
  imports: [
    AppEngineDevelopmentRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    AppEngineDevelopmentComponent
  ],
  providers: []
  
})
export class AppEngineDevelopementModule { }
