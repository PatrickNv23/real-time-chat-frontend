import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  authService.getCurrentSession().subscribe({
    next: (response: any) => {
      (!response || response === null) && router.navigate(['/auth']);
    },
    error: (error: any) => {
      router.navigate(['/auth'])
    }
  })

  return true;
};

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  authService.getCurrentSession().subscribe({
    next: (response: any) => {
      (response && response !== null) && router.navigate(['/home']);
    },
    error: (error: any) => {
      router.navigate(['/auth'])
    }
  })

  return true;
};
