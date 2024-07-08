import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('X-Skip-Interceptor')) {
      const newHeaders = req.headers.delete('X-Skip-Interceptor');
      const newRequest = req.clone({ headers: newHeaders });
      return next.handle(newRequest);
    }

    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error in interceptor:', error);
        return throwError(() => error);
      })
    );
  }
}