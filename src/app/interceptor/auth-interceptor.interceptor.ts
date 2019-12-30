import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
    request = request.clone({
      withCredentials: true,
    });
    request = request.clone({
      headers: request.headers
        .append('Access-Control-Allow-Origin','null')
        // .append('Access-Control-Allow-Methods','*')
        // .append('Access-Control-Allow-Origin','origin-list'),
    });
    return next.handle(request);
  }
}
