// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
// import {Login} from '../models/login.model';
// import {Observable} from 'rxjs';
// import {SERVER_API_URL} from '../../config/url';
// import {map} from 'rxjs/operators';
//
// type JwtToken = {
//   id_token: string;
// };
//
// @Injectable({ providedIn: 'root' })
// export class AuthServerProvider {
//   constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}
//
//   getToken(): string {
//     return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
//   }
//
//   login(credentials: Login): Observable<void> {
//     return this.http
//       .post<JwtToken>(SERVER_API_URL + 'api/authenticate', credentials)
//       .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
//   }
//
//   logout(): Observable<void> {
//     return new Observable(observer => {
//       this.$localStorage.clear('authenticationToken');
//       this.$sessionStorage.clear('authenticationToken');
//       observer.complete();
//     });
//   }
//
//   private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
//     const jwt = response.id_token;
//     if (rememberMe) {
//       this.$localStorage.store('authenticationToken', jwt);
//     } else {
//       this.$sessionStorage.store('authenticationToken', jwt);
//     }
//   }
// }
