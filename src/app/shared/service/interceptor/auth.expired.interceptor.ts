// import {Injectable} from '@angular/core';
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {LoginService} from '../backend/login.service';
// import {StateStorageService} from '../backend/state.storage.service';
// import {Observable} from 'rxjs';
// import {tap} from 'rxjs/internal/operators/tap';
// import {Router} from '@angular/router';
//
// @Injectable()
// export class AuthExpiredInterceptor implements HttpInterceptor {
//   constructor(
//     private loginService: LoginService,
//     private stateStorageService: StateStorageService,
//     private router: Router
//   ) {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(
//       tap(null, (err: HttpErrorResponse) => {
//         if (err.status === 401 && err.url && !err.url.includes('api/account')) {
//           this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
//           this.loginService.logout();
//           this.router.navigate(['/sign/in']);
//         }
//       })
//     );
//   }
// }
