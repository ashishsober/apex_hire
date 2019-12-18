import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { job_board } from './job.model';
import { HttpClient } from '@angular/common/http'
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable()
export class JobService {
    constructor(private http: HttpClient){}
    private getHostname() {
        let hostname: string = '';
        if (window.location.host === 'localhost:4200') {
              hostname = "http://localhost:1337";
        } else {
              hostname = 'http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337';
        }
        return hostname;
     }
    save(job):Observable<any>{
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/jobVrd');
        if(!job._id){
            return this.http.post(url,job).pipe(catchError(this.formatErrors));
        } else {
            return this.http.put(url,job).pipe(catchError(this.formatErrors));
        }
       
    }
    getJob():Observable<any>{
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/jobVrd');
        return this.http.get(url).pipe(catchError(this.formatErrors));
    }
    deleteJob(id:any):Observable<any>{
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/jobVrd/delete/');
        url = url + id;
        return this.http.delete(url).pipe(catchError(this.formatErrors));
    }
    private formatErrors(error: any) {
        return  throwError(error.error);
    }
}