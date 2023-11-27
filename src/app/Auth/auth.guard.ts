import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs";


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      const isAuth = !!user;

      if (isAuth) return true;

      return router.createUrlTree(['/']);
    })
  );
};
