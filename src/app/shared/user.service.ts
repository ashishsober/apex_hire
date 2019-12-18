import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as Rx from "rxjs";
import { user_Data } from './userData.modal';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable({
      providedIn: 'root'
})
export class UserService {
      private currentUserSubject = new Rx.BehaviorSubject<user_Data>({} as user_Data);
      public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

      private isAuthenticatedSubject = new Rx.ReplaySubject<boolean>(1);
      public isAuthenticated = this.isAuthenticatedSubject.asObservable();

      constructor(private http: HttpClient,
            private tokenService: TokenService) {
            //console.log('shared service started');
      }

      getHostname() {
            let hostname: string = '';
            if (window.location.host === 'localhost:4200' || window.location.host === '192.168.0.3:8080') {
                  hostname = "http://localhost:1337";
            } else {
                  hostname = 'http://ec2-3-17-146-125.us-east-2.compute.amazonaws.com:1337';
            }
            return hostname;
      }

      populate() {
            if (this.tokenService.getToken()) {
                  let data = {
                        applicants: {},
                        application: {
                              message: "",
                              response_action: ""
                        },
                        client: {
                              id: "",
                              accessToken: "",
                              emails: [{ value: '' }],
                              photos: [{ value: '' }],
                              displayName: ""
                        }
                  };
                  this.getUser(data).subscribe((result) => {
                        if (result.application.response_action != "hard") {
                              this.setAuth(result.client);
                        } else {
                              this.purgeAuth();
                        }

                  });
            } else {
                  this.purgeAuth();
            }

      }
      getUser(data: any): Observable<any> {
            let getHostname = this.getHostname();
            let url = getHostname.concat('/application/auth');
            return this.http.post(url, data).pipe(catchError(this.handleError));
      }


      googleAuthCall() {
            let getHostname = this.getHostname();
            let url = getHostname.concat('/auth/google');
            window.open(url, "mywindow", "location=1,status=1,scrollbars=1, width=800,height=800");
            let listener = window.addEventListener('message', (message) => {
                  console.log("inside the listener---" + message.data.user);
                  if (message.data.user != undefined) {
                        this.setAuth(message.data.user);
                  }
            });
            return listener;
      }

      setAuth(user: user_Data) {
            // Save JWT sent from server in localstorage
            this.tokenService.saveToken(user.accessToken);
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
      }

      purgeAuth() {
            this.tokenService.destroyToken();
            // Set current user to an empty object
            this.currentUserSubject.next({} as user_Data);
            // Set auth status to false
            this.isAuthenticatedSubject.next(false);
      }

      getCurrentUser(): user_Data {
            console.log("last emmited value" + this.currentUserSubject.value)
            return this.currentUserSubject.value;
      }

      logout(data: any): Observable<any> {
            let getHostname = this.getHostname();
            let url = getHostname.concat('/application/logout');
            return this.http.post(url, data)
                  .pipe(map((data) => {
                        this.purgeAuth();
                        return data;
                  }))
                  .pipe(catchError(this.handleError));;
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