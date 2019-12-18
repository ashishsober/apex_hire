import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { careerResponse } from './career.modal';

@Injectable()
export class CareerService {
      //subject = new Rx.Subject();
      //userModal: user_Data;
      constructor(private http: HttpClient) {
            //     this.userModal = new user_Data();
      }

      /**
       * firring api's
       */
      genderboxData: Array<any> = [
            {
                  "CODE_DESC": "Male",
                  "CODE_VALUE": "male"
            },
            {
                  "CODE_DESC": "Female",
                  "CODE_VALUE": "female"
            }
      ];
      nightShiftboxData: Array<any> = [
            {
                  "CODE_DESC": "Yes",
                  "CODE_VALUE": "yes"
            },
            {
                  "CODE_DESC": "No",
                  "CODE_VALUE": "no"
            }
      ];


      getHostname() {
            let hostname: string = '';
            if (window.location.host === 'localhost:4200') {
                  hostname = "http://localhost:1337";
            } else {
                  hostname = 'http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337';
            }
            return hostname;
      }


      postCareer(data: careerResponse): Observable<careerResponse> {
            let getHostname = this.getHostname();
            let url = getHostname.concat('/application/careerVrd');
            return this.http.post<careerResponse>(url, data)
                  .pipe(catchError(this.handleError));
      }

      // private extractData(res:any) {
      //       let body = res.json();
      //       return body || {}
      // }

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