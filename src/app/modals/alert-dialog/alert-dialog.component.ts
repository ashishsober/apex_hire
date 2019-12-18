import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  responseStatus: string;
  responseAction: string;
  message: string;
  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public error: any) { }

  ngOnInit() {
    this.responseAction = 'STOP';
    this.message = this.error + '----Please check your connection';
  }
}