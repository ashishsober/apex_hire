import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, distinctUntilChanged } from 'rxjs/operators';
import * as Rx from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { management } from './management.model'

@Injectable()
export class ManagementService {
    dataChange: Rx.BehaviorSubject<management[]> = new Rx.BehaviorSubject<management[]>([]);
    dialogData: management;

    private managementDataSubject = new Rx.BehaviorSubject<management>({} as management);
    public currentManagementData = this.managementDataSubject.asObservable().pipe(distinctUntilChanged());

    private updateManagementSubject = new Rx.BehaviorSubject<management>({} as management);
    public updateManagementData = this.updateManagementSubject.asObservable().pipe(distinctUntilChanged());
      
    constructor(private http: HttpClient) { }

    getHostname() {
        let hostname: string = '';
        if (window.location.host === 'localhost:4200') {
            hostname = "http://localhost:1337";
        } else {
            hostname = 'http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337';
        }
        return hostname;
    }

    postManagement(data: any): Observable<any> {
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/managementVrd');
        return this.http.post(url, data).pipe(catchError(this.handleError));
    }

    putManagement(data: any): Observable<any> {
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/managementVrd');
        return this.http.put(url, data).pipe(catchError(this.handleError));
    }

    getManagement(): Observable<any> {
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/managementVrd');
        return this.http.get(url).pipe(catchError(this.handleError));
    }
    deleteManagement(id: string): Observable<any> {
        let getHostname = this.getHostname();
        let url = getHostname.concat('/application/managementVrd/delete/');
        url = url + id;
        return this.http.delete(url).pipe(catchError(this.handleError));
    }

    addManagement(data) {
        if(!data.applicants._id){
            this.postManagement(data).subscribe(
                result => this.managementDataSubject.next(result.applicants),
                err => console.log(err)
            );
        } else {
            this.putManagement(data).subscribe(
                result => this.updateManagementSubject.next(result.applicants),
                err => console.log(err)
            );  
        }
        
    }

    
    private handleError(error: HttpErrorResponse) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}