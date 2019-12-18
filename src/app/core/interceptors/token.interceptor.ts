import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../shared/token.service';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerConfig = {
            'Content-Type': 'application/json',
            'Accept': 'Application/json'
        }

        const token = this.tokenService.getToken();
        if (token) {
            headerConfig['Authorization'] = `${token}`;
        }
        const request = req.clone({ setHeaders: headerConfig })
        return next.handle(request);
    }

}