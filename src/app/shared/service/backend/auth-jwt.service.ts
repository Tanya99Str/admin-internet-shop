import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login.model';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../config/url';
import {map} from 'rxjs/operators';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(SERVER_API_URL + 'api/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      sessionStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken): void {
    const jwt = response.id_token;
    console.log(jwt);
    localStorage.setItem('authenticationToken', jwt);
    console.log(localStorage.getItem('authenticationToken'));
  }
}
