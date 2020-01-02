import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

// @Injectable()
// export class BasicInterceptorService implements HttpInterceptor {
//   constructor(private authenticationService: AuthenticationService) { }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
//       const authReq = req.clone({
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': `Basic ${btoa(this.authenticationService.email + ":" + this.authenticationService.password)}`
//         })
//       });
//       console.log(req.headers);
//       return next.handle(authReq);
//     } else {
//       return next.handle(req);
//     }
//   }
// }
// @Injectable()
// export class BasicInterceptorService implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const xhr = req.clone({
//       headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
//     });
//     return next.handle(xhr);
//   }
// }
 @Injectable()
 export class BasicInterceptorService implements HttpInterceptor {
constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let requestMethod: string = req.method;
requestMethod = requestMethod.toLowerCase();

if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put')) {
  const headerName = 'X-XSRF-TOKEN';
  let token = this.tokenExtractor.getToken() as string;
  if (token !== null && !req.headers.has(headerName)) {
    req = req.clone({headers: req.headers.set(headerName, token)});
  }
}
return next.handle(req);
}
}
