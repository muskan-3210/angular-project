import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add new headers
    const token = localStorage.getItem('authorization') // Replace with your token retrieval logic
    console.log('interceptor')

    // Clone and modify the request
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors globally
        console.error('An error occurred:', error.message);
        // Optionally, redirect to a login page or show a notification
        return throwError(() => new Error(error.message));
      })
    );
  }
}
