import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

export const NonAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        // User is authenticated, redirect to tasks
        return router.createUrlTree(['/tasks']);
      }
      // User is not authenticated, allow access to login/register
      return true;
    })
  );
};