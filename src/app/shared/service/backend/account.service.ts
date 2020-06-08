import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SERVER_API_URL} from '../../config/url';
import {AccountModel} from '../models/account.model';
import {of} from 'rxjs/internal/observable/of';
import {catchError, shareReplay} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: AccountModel | null = null;
  private authenticationState = new ReplaySubject<AccountModel | null>(1);
  private accountCache$?: Observable<AccountModel | null>;

  constructor(private http: HttpClient, private router: Router) {
  }

  save(account: AccountModel): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/account', account);
  }

  authenticate(identity: AccountModel | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<AccountModel | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: AccountModel | null) => {
          this.authenticate(account);

          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<AccountModel | null> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.userIdentity ? this.userIdentity.imageUrl : '';
  }

  private fetch(): Observable<AccountModel> {
    return this.http.get<AccountModel>(SERVER_API_URL + 'api/account');
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    // const previousUrl = this.stateStorageService.getUrl();
    // if (previousUrl) {
    //   this.stateStorageService.clearUrl();
    //   this.router.navigateByUrl(previousUrl);
    // }
  }




}
