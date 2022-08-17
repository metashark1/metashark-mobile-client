import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "./services/user.service";

@Injectable({
  providedIn: "root",
})
export class LoggedinGuard implements CanActivate {
  constructor(private router: Router, private auth: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.logged.pipe(
      map((logged) => {
        if (!logged) {
          this.router.navigate(["/auth"]);
          return false;
        }
        return true;
      })
    );
  }
}
