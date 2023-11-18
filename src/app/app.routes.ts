import { Routes } from '@angular/router';
import { authGuard, isLoggedInGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/sign-in/sign-in.component').then(component => component.SignInComponent),
    canActivate: [isLoggedInGuard]
  },
  {
    path: 'auth/sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.component').then(component => component.SignUpComponent),
    canActivate: [isLoggedInGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(component => component.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(component => component.NotFoundComponent)
  }
];
