import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    /*request = request.clone({
      // headers: request.headers
      //   .append('userToken', localStorage.getItem("userToken"))
      //   .append('Header1', "header1")

      headers: request.headers
        .set('Cookie', 'JSESSIONID=34E9FFEF2EBEC41627F6DECDE53FF7A7;')
        // .append('Header1', "header1")

      // headers: request.headers
      //   .set('JSESSIONID','EE62EE3D6E3150B887952342A75199ED')
      //   .append('userToken', localStorage.getItem("userToken"))
    });*/
    return next.handle(request);
  }
}
