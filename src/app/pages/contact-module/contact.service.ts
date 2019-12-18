import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ContactService {
      technologiesSelectboxData: Array<any> = [
            {
                  "CODE_DESC": "App Engine Development",
                  "CODE_VALUE": "app_engine_development"
            },
            {
                  "CODE_DESC": "Software Development",
                  "CODE_VALUE": "software_development"
            },
            {
                  "CODE_DESC": "ERP Solution",
                  "CODE_VALUE": "erp_solution"
            },
            {
                  "CODE_DESC": "Cloud Computing",
                  "CODE_VALUE": 'cloud_computing'
            },
            {
                  "CODE_DESC": "IOT",
                  "CODE_VALUE": 'iot'
            },
            {
                  "CODE_DESC": "Other",
                  "CODE_VALUE": "other"
            }
      ];
      contact_address: Array<any> = [
            {
                  "office": "Regd. OFFICE",//mandatory fields
                  "address_line1": "127 Vaishali Nagar,",//mandatory fields
                  "address_line2": "Bhopal (M.P) / India 4620016",//mandatory fields
                  "address_line3": "",
                  "address_line4": "",
                  "contact": "0755-4272034",
                  "email_id": ""
            },
            {
                  "office": "ADMIN OFFICE",
                  "address_line1": "17 Malviya Nagar , ",
                  "address_line2": "Bhopal (M.P) / India ",
                  "address_line3": "",
                  "address_line4": "",
                  "contact": "0755-4276923",
                  "email_id": ""
            },
            {
                  "office": "DELHI",
                  "address_line1": "1201 NIRMAL TOWER",
                  "address_line2": "Barakhamba Road",
                  "address_line3": "New Delhi, India 110 001",
                  "address_line4": "",
                  "contact": "",
                  "email_id": "contact@vrdnetwork.com"
            },
            {
                  "office": "BANGALORE",
                  "address_line1": "Manyata Embassy Business Park",
                  "address_line2": "Ground Floor, E1 Block, Beech Building",
                  "address_line3": "Outer Ring Road",
                  "address_line4": "Bangalore - (Karnataka) India 560 045",
                  "contact": "080-4276-4665",
                  "email_id": "hr@vrdnetwork.com"
            }];
      constructor(private http: HttpClient) { }

      getHostname() {
            let hostname: string = '';
            if (window.location.host === 'localhost:4200') {
                  hostname = "http://localhost:1337";
            } else {
                  //console.log("window.location.host --->" + window.location.host);
                  hostname = 'http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337';
            }
            return hostname;
      }

      postContact(data: any): Observable<any> {
            let getHostname = this.getHostname();
            let url = getHostname.concat('/application/contactVrd');
            return this.http.post(url, data)
                  .pipe(catchError(this.handleError));;
      }

      private handleError(error: HttpErrorResponse) {
            // In a real world app, we might use a remote logging infrastructure
            let errMsg: string;
            if (error.error instanceof ErrorEvent) {
                  console.error('An error occurred:', error.error.message);
            } else {
                  console.error(
                        `Backend returned code ${error.status}, ` +
                        `body was: ${error.error}`);
            }
            return throwError('Something bad happened; please try again later.');
      }
}