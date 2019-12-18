import { Component } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'ngv-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact_address: Array<any> = this.contactService.contact_address;
  constructor(private contactService: ContactService) { }
}
