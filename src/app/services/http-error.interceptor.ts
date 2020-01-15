import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry,tap, catchError } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
         catchError((err: any) => {
           if(err instanceof HttpErrorResponse) {
            try {
              this.toast.error(`${err.error}`);
             } catch(e) {
               this.toast.error('An error occurred');
             }
        }
            console.error(err);
        return throwError(err);
      }));
  }
}
