import {flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Login} from '../models/login.model';
import {AccountModel} from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor() {}

  // login(credentials: Login): Observable<AccountModel | null> {
  //   return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  // }
  //
  // logout(): void {
  //   this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  // }
}
