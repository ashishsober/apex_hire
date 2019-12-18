import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { JobBoardRoutingModule } from './job-board.routing';
import { JobBoardComponent } from './job-board.component';
import { JobBoardEditModalComponent } from './job-board-edit-modal/job-board-edit.component';
import { JobService } from './jobs.service';
@NgModule({
  imports: [
    JobBoardRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    JobBoardComponent, JobBoardEditModalComponent
  ],
  providers: [JobService],
  entryComponents: [JobBoardEditModalComponent]

})
export class JobBoardModule { }
