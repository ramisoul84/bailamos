import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //req.url.includes('auth/login') || req.url.includes('auth/register')
    const token = this.storage.getToken();
    if (token) {
      const reqClone = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(reqClone);
    } else {
      return next.handle(req);
    }
  }
}
