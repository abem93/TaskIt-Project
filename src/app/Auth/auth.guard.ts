import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        // User is authenticated, allow access
        return true;
      }
      // User is not authenticated, redirect to login
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    })
  );
};