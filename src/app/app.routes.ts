import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/login/login.component').then(component => component.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/register/register.component').then(component => component.RegisterComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(component => component.NotFoundComponent)
  }
];
