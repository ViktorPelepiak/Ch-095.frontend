import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  headerName: string = 'X-XSRF-TOKEN';
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestMethod = req.method.toLowerCase();
    if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put')) {
      let token = this.tokenExtractor.getToken();
      if (token !== null && !req.headers.has(this.headerName)) {
        req = req.clone({headers: req.headers.set(this.headerName, token)});
      }
    }

    req = req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }
}
