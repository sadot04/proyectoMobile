import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },

  { path: '', redirectTo: 'main', pathMatch: 'full' }, // Redirige a 'main' por defecto
  { path: 'main', loadComponent: () => import('./main/main.page').then(m => m.MainPage) },

  { path: 'reportar-perdido', loadComponent: () => import('./pages/reportar-perdido/reportar-perdido.page').then(m => m.default) },
  { path: 'reportar-celo', loadComponent: () => import('./pages/reportar-celo/reportar-celo.page').then(m => m.default) },
  { path: 'reportar-basura', loadComponent: () => import('./pages/reportar-basura/reportar-basura.page').then(m => m.default) },
];
