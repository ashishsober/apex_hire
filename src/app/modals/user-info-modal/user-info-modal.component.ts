import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertDialogComponent } from '../../modals/alert-dialog/alert-dialog.component';
import { user_Data } from '../../shared/userData.modal';

@Component({
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],
})
export class UserInfoModalComponent implements OnInit {
  currentUser: user_Data
  alertDialogRef: MatDialogRef<AlertDialogComponent>;

  constructor(private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    let obj = {
      applicants: {},
      application: {
        message: "",
        response_action: ""
      },
      client: { 
        accessToken:""
      }
    };
    this.userService.logout(obj).subscribe((result) => {
      console.log("logout sucessfully");
      this.dialog.closeAll();
    }, (err) => {
      console.log(err);
      this.errorModal(err);
    });
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