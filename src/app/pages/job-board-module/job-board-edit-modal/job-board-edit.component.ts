import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertDialogComponent } from '../../../modals/alert-dialog/alert-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { job_board } from '../job.model';
import { JobService } from '../jobs.service';

@Component({
    templateUrl: './job-board-edit.component.html',
    styleUrls: ['./job-board-edit.component.scss'],
})
export class JobBoardEditModalComponent implements OnInit {
    alertDialogRef: MatDialogRef<AlertDialogComponent>;
    job: job_board = {} as job_board;
    jobForm: FormGroup;
    requirements: FormArray;

    constructor(private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: job_board,
        private fb: FormBuilder,
        private jobService: JobService) {

        this.jobForm = this.fb.group({
            title: '',
            location: '',
            jobType: '',
            jobId: '',
            experience: '',
            _id: '',
            requirements: this.buildArray()
        });
    }

    buildArray() {
        this.requirements = this.fb.array([
            this.buildGroup()
        ]);
        return this.requirements;
    }

    buildGroup(): FormGroup {
        return this.fb.group({
            requirement: ''
        })
    }

    ngOnInit() {
        console.log(this.data);
        if (this.data) {
            this.jobForm.patchValue(this.data);
            let controlArray = <FormArray>this.jobForm.controls['requirements'];
            this.data.requirements.forEach((req, index) => {
                if (index > 0) {
                    const fb = this.buildGroup();
                    fb.patchValue(req);
                    controlArray.push(fb);
                }

            });
        }

    }

    addRequirement() {
        this.requirements.push(this.buildGroup());
    }

    onSubmit() {
        //update the model
        this.updateJobForm(this.jobForm.value);
        this.jobService.save(this.job).subscribe(
            (data) => {
                console.log("successfully created" + data);
            },
            err => this.errorModal(err)
        )
    }

    updateJobForm(values: Object) {
        Object.assign(this.job, values);
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