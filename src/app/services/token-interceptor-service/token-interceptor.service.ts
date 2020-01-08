import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  headers;
  constructor(
    private authService: AuthService,
    private $localStorage: LocalStorageService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.$localStorage.retrieve('authenticationtoken');
    console.log('jwt token', token);
    if (token) {
      let cloned = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `${token}`
        })
      });
      if (request.method == "GET") {
        console.log("IS A GET REQUEST WITH JWT TOKEN");
        cloned = request.clone({
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Authorization': `${token}`
          })
        });
      }
      return next.handle(cloned);
    }
    else {
      if (request.method == "GET") {
        console.log("IS A GET REQUEST ");
        request = request.clone({
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Authorization': `${token}`
          })
        });
      }
      else {
        request = request.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          })
        });
      }
      return next.handle(request);
    }
  }
}