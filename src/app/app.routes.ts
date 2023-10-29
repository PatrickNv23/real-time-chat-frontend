import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/sign-in/sign-in.component').then(component => component.SignInComponent)
  },
  {
    path: 'auth/sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.component').then(component => component.SignUpComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(component => component.NotFoundComponent)
  }
];
