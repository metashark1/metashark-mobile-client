import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  getToken() {
    return localStorage.getItem("access-token");
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getToken();

    // CHECK IF REQUEST URL IS OUR AND ADD TOKEN
    if (
      token &&
      (request.url.includes(environment.defaultHostApi) ||
        request.url.includes("mapi-stage.metashark.tv") ||
        request.url.includes("mapi.metashark.tv"))
    ) {
      request = request.clone({ setHeaders: { Authorization: token } });
    }

    return next.handle(request);
  }
}
