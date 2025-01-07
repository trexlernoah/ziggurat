import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { map } from 'rxjs';

import { AccountService } from '@services/account.service';

export const authGuard: CanActivateFn = (route) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.user$.pipe(
    map((user) => {
      const url = route.routeConfig?.path;
      if (!user) {
        if (['login', 'register'].some((route) => route === url)) return true;
      } else {
        if (['profile'].some((route) => route === url)) return true;
      }

      return new RedirectCommand(router.parseUrl('/'));
    })
  );
};
