import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RegisterPayload } from './register-payload';
import { Observable, of } from 'rxjs';
import { LoginPayload } from './login-payload';
import { JwtAuthResponse } from './jwt-auth-response';
import  { tap, map, catchError } from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import { MessageService } from '../message-service/message.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://blog-team-1.herokuapp.com/api/auth';

  private log(message: string) {
    this.messageService.add(`BlogService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  // httpOptions = {
  //   headers: new HttpHeaders(
  //     {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     }
  //   )
  // };

  constructor(
    private httpClient: HttpClient,
    private $localStorage: LocalStorageService,
    private messageService: MessageService
    ) { }

  register(registerPayload:RegisterPayload): Observable<any> {
    return this.httpClient.post(`${this.url}/signup`, registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<string>{
    this.$localStorage.store('username', loginPayload.username);
    // console.log(loginPayload);
    return this.httpClient.post(`${this.url}/login`, loginPayload, {responseType: 'text'}).pipe( 
      tap(data => {
        this.log('logging user in');
        this.$localStorage.store('authenticationToken', data);
        // console.log(this.$localStorage.retrieve('authenticationToken'));
      }),
      catchError(this.handleError<any>('login method failed'))
    );

  }

  isAuthenticated(): boolean {
    return this.$localStorage.retrieve('username') != null;
  }

  logout() {
    this.$localStorage.clear('authenticationToken');
    this.$localStorage.clear('username');
  }

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken');
  }
}
