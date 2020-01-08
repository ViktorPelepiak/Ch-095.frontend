import {Observable, throwError} from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toast: ToastrService, private router: Router, private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({withCredentials: true});
    return next.handle(req).pipe(retry(1), catchError((error: any) => {
      if (error && error.status && error.status === 401) {
        this.toast.error('Authorize time out');
        this.router.navigate(['/login']).catch(e => console.error(e));
        this.authenticationService.logout();
      }
      return throwError(error);
    }));
  }
}
