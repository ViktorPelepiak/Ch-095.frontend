import { Observable } from 'rxjs';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.headers);
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin',''),
      withCredentials: true
    });
    return next.handle(request);
  }
}
