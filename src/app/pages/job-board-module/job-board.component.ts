import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { job_board } from './job.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { JobBoardEditModalComponent } from './job-board-edit-modal/job-board-edit.component';
import { JobService } from './jobs.service';

@Component({
  selector: 'ngv-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.scss']
})
export class JobBoardComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  jobData: job_board[] = [
    {
      "_id": "5cf79cda8e0c402597edf71f",
      "experience": "2+ years",
      "jobId": "APXMDG001",
      "jobType": "Permanent",
      "location": "Philadelphia",
      "title": "IOT Developers",
      "requirements": [
        {
          "requirement": "Design and Develop Entity Types in SAP MDG "
        },
        {
          "requirement": "Design and Develop Multi-Level Workflows in SAP "
        },
        {
          "requirement": "Configure SAP MDG UI"
        },
        {
          "requirement": "Configure SAP MDG Business Rules Framework Plus (BRF+)"
        },
        {
          "requirement": "Understand SAP Master Data Elements (Customer, Vendor, Material, and Org Structure Elements) "
        },
        {
          "requirement": "Functional skills - SAP MDG Configuration , SAP Business Workflow"
        },
        {
          "requirement": "Should have minimum 1 full SAP MDG roll out experience in MDG"
        },
        {
          "requirement": "Have a good understanding in Material master, Customer master, Supplier master and Financial master"
        },
        {
          "requirement": "Should have experience in integrating MDG with other satellite systems for deployment"
        },
        {
          "requirement": "Excellent Communication Skills"
        }
      ]
    }
  ];
  jobBoardEditModalComponent: MatDialogRef<JobBoardEditModalComponent>;
  constructor(private dialog: MatDialog,
    private jobService: JobService) { }

  ngOnInit() {
    // this.jobService.getJob().subscribe(
    //   data => this.jobData = data,
    //   err => console.log(err)
    // )
  }
  addJob() {
    this.jobBoardEditModalComponent = this.dialog.open(JobBoardEditModalComponent, {
      hasBackdrop: false,
      height: '600px',
      width: '800px',
    });
  }
  openDialog(id: any): void {
    const dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteJob(id);
      }
    });
  }

  deleteJob(value: any) {
    const list = this.jobData;
    this.jobService.deleteJob(value).subscribe((data) => {
      console.log(data);
      const listArray = list.filter((item) => item._id !== value);
      this.jobData = listArray;
    }, (error) => {
      console.error(error);
    });
  }
  editJob(data: job_board) {
    this.jobBoardEditModalComponent = this.dialog.open(JobBoardEditModalComponent, {
      hasBackdrop: false,
      height: '600px',
      width: '800px',
      data: data
    });
  }
}
