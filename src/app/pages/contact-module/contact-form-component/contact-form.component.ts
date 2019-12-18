import { Component } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material'
import { contactModal } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertDialogComponent } from '../../../modals/alert-dialog/alert-dialog.component';

@Component({
  selector: 'ngv-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contactModal = new contactModal('', '', null, '', '', '');
  hide: boolean = false;
  showForm = true;
  alertDialogRef: MatDialogRef<AlertDialogComponent>;
  selectboxData: Array<any> = this.contactService.technologiesSelectboxData;
  contact_address: Array<any> = this.contactService.contact_address;
  showSpinner = false;

  constructor(private contactService: ContactService,
    private dialog: MatDialog) { }

  onselect(event: MatOptionSelectionChange) {
    if (event.source.selected) {
      if (event.source.value === 'other') {
        this.hide = true; //making visible,field should be blank
        this.contactModal.other = null;
      } else {
        this.hide = false;
        this.contactModal.other = null;
      }
    }
  }

  onSubmit({ form, valid }: { form: NgForm, valid: boolean }) {
    if (valid) {
      this.showSpinner = true;
      this.contactService.postContact(form.value).subscribe((result) => {
        this.showSpinner = false;
        this.showForm = false;
        form.reset();
      }, err => {
        this.showSpinner = false;
        console.log(err);
        this.errorModal(err);
      });
    }
  }


  numberval = true;
  onKey(evt: any) {
    if (this.contactModal.phone_no.toString().length >= 10) {
      this.numberval = true;
    }
  }

  checkServerResponse(appData: any, form: NgForm) {
    let applicationStatus = appData.application.response_type.toUpperCase(); //info
    let responseAction = appData.application.response_action.toUpperCase();
    switch (responseAction) {
      case 'STOP':
        this.errorModal(appData);
        break;
      case 'CONTINUE':
      case 'SUCCESS':
        this.errorModal(appData);
        form.reset();
        break;
      default:
        //error modal to show  
        this.errorModal(appData);
    }

  }


  errorModal(err: any) {
    this.alertDialogRef = this.dialog.open(AlertDialogComponent, {
      hasBackdrop: true,
      height: '316px',
      width: '874px',
      disableClose: true,
      data: err
    });
  }


}
