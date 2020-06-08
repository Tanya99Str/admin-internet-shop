import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../config/url';
import {AuthServerProvider} from '../backend/auth-jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: AuthServerProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url || (request.url.startsWith('http') && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
      return next.handle(request);
    }

    const token = this.tokenService.getToken();
    console.log(token);
    if (token != null) {
      request = request.clone({ headers: request.headers.set("Authorization", 'Bearer ' + token) });
    }
    return next.handle(request);
  }
}
