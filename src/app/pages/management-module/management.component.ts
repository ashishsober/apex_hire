import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ManagementEditModalComponent } from './management-edit-modal/management-edit-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ManagementService } from './management.service';
import { user_Data } from '../../shared/userData.modal';
import { management } from './management.model'
import * as Rx from "rxjs";


@Component({
  selector: 'ngv-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  ManagementEditModalComponent: MatDialogRef<ManagementEditModalComponent>;
  currentUser: user_Data;
  managementList: management[];
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(public managementService: ManagementService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.managementService.getManagement().subscribe((data: management[]) => {
      this.managementList = data;
    }, (error) => {
      console.error(error);
    });
    this.refreshTable();
    this.showUpdatedItem();
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteManage(id);
      }
    });
  }


  addManagement() {
    this.dialog.open(ManagementEditModalComponent, {
      hasBackdrop: false,
      height: '600px',
      width: '400px',
      data: null
    });
  }

  refreshTable() {
    this.managementService.currentManagementData.subscribe(
      (newAddedData: management) => {
        if (Object.keys(newAddedData).length != 0 &&  this.managementList != undefined) {
          this.managementList.push(newAddedData);
        }

      }
    )
  }


  deleteManage(value: any) {
    const list = this.managementList;
    this.managementService.deleteManagement(value).subscribe((data) => {
      const listArray = list.filter((item) => item._id !== value);
      this.managementList = listArray;
    }, (error) => {
      console.error(error);
    });
  }

  editManage(item: management) {
   this.dialog.open(ManagementEditModalComponent, {
      hasBackdrop: false,
      height: '600px',
      width: '400px',
      data: item
    });
  }

  showUpdatedItem() {
    this.managementService.updateManagementData.subscribe(
      (newUpdatedData: management) => {
        if (Object.keys(newUpdatedData).length != 0 &&  this.managementList != undefined) {
          let index = this.managementList.findIndex(item => item._id == newUpdatedData._id);
          this.managementList[index] = newUpdatedData;
        }
      }
    )
  }
}
