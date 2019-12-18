import { Component, Output, EventEmitter, NgZone, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertDialogComponent } from '../../modals/alert-dialog/alert-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserInfoModalComponent } from '../../modals/user-info-modal/user-info-modal.component';
import { user_Data } from '../userData.modal';

@Component({
    selector: 'ngx-login-btn',
    templateUrl: './loginbtn.component.html',
    styleUrls: ['./loginbtn.component.scss']
})
export class LoginbtnComponent implements OnInit {
    alertDialogRef: MatDialogRef<AlertDialogComponent>;
    displayNone: boolean = false;//do not show the user image icon on initial load
    @Output() right50Event = new EventEmitter<boolean>();
    userInfoModalComponent: MatDialogRef<UserInfoModalComponent>;
    
    constructor(private userService: UserService,
        private dialog: MatDialog) {
    }
    currentUser: user_Data;
    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                    console.log("at login button component");
                    this.currentUser = userData;
            }
        );
    }

    googleAuth(value: string) {
        if (value === 'Login') {
            this.userService.googleAuthCall();
        } else {
            this.logout();
        }
    }

    logout() {
        let obj = {
            applicants: {},
            application: {
                message: "",
                response_action: "logout"
            },
            client: {
                accessToken: ""
            }
        };
        this.userService.logout(obj).subscribe((result) => {
            console.log("logout sucessfully")
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

    infoModal() {
        this.userInfoModalComponent = this.dialog.open(UserInfoModalComponent, {
            hasBackdrop: true,
            height: '400px',
            width: '300px',
            position: { top: '65px', right: '15px' }
        });
    }
}
