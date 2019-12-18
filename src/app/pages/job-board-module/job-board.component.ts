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
    // { _id:"",
    //   title: 'SAP PP-PI Consultant',
    //   location: 'Bengaluru',
    //   jobType: 'Permanent Position',
    //   jobId: "",
    //   experience: 'Requires 7+ years’ experience in delivering solutions within the SAP PP-PI module.Able to setup all PP-PI master data',
    //   requirement: ['7+ years of SAP configuration for PP-PI', 'Experience in setting up Master data for: PPDS, Planning, S&OP, LTP',
    //     'Chemical Industry experience preferred and a plus', 'Experience in MRP processes and planning, make to order and make to stock scenarios',
    //     'Knowledge of APO planning (PPDS), Plant maintenance, QM and MM a plus', 'Batch management knowledge required ',
    //     'Material Forecasting and Demand Management a plus', 'LTP, MPS and SOP a plus', 'Excellent verbal and written communication skills'
    //   ]
    // },
    // {
    //   _id:"",
    //   title: 'Syteline Functional Consultant',
    //   location: 'Bengaluru',
    //   jobType: 'Permanent Position',
    //   jobId: "",
    //   experience: 'We are looking for Syteline functional consultant to join our Syteline team and support us in our existing requirement.4+ years of Syteline Experience is required.',
    //   requirement: []
    // },
    // {
    //   _id:"",
    //   title: 'Power BI Consultant',
    //   location: 'Bengaluru',
    //   jobType: 'Contract',
    //   jobId: "",
    //   experience: 'We are looking for a Power BI Consultant who has good experience to build complex data model in power BI and develop advance report/Cubes in Power BI.',
    //   requirement: []
    // },
    // {
    //   _id:"",
    //   title: '.Net Consultant',
    //   location: 'Bengaluru',
    //   jobType: 'Permanent Position',
    //   jobId: "",
    //   experience: '4+ Years',
    //   requirement: ['Web applications configurations in cloud and user support for the application', 'Develop reports using SQL Server Reporting Services, Power BI and other reporting tools',
    //     'Configure and maintain Microsoft Azure PaaS environments', 'Microsoft Azure cloud platform technologies', 'Visual Studio 2013 or later',
    //     'ASP.NET, C#  and T-SQL.', 'Solid understanding of software testing, continuous integration & continuous delivery', 'Web technologies – HTML, CSS, JS'
    //   ]
    // },
  ]
  jobBoardEditModalComponent: MatDialogRef<JobBoardEditModalComponent>;
  constructor(private dialog: MatDialog,
    private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJob().subscribe(
      data => this.jobData = data,
      err => console.log(err)
    )
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
