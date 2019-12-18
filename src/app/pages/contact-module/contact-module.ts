import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactFormComponent } from './contact-form-component/contact-form.component';
import { ContactService } from './contact.service';

@NgModule({
  imports: [
    ContactRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ContactComponent, ContactFormComponent
  ],
  providers: [ ContactService ]
  
})
export class ContactModule { }
