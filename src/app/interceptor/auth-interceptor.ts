import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import { AuthService } from '../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

const AUTH_HEADER_NAME = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    let requestToSend = this.prepareRequest(request)

    return httpHandler.handle(requestToSend).pipe(catchError((err: any) => {
      if (err.status !== 403) {
        console.log("error");
      }
      return throwError(err);
    }));
  }

  private prepareRequest(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.headers.get(AUTH_HEADER_NAME)) {
      let token = this.authService.user?.token;
      if (token) {
          return request.clone({headers: request.headers.set(AUTH_HEADER_NAME, 'Bearer ' + token)});
      }
    }

    return request
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];