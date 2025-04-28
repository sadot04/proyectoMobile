import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./main/main.page').then((m) => m.MainPage),
  },
  {
    path: 'notificaciones',
    loadComponent: () =>
      import('./pages/notificaciones/notificaciones.page').then((m) => m.NotificacionesPage),
  },  {
    path: 'reportes',
    loadComponent: () =>
      import('./pages/reportes/reportes.page').then((m) => m.ReportesPage),
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./pages/estadisticas/estadisticas.page').then((m) => m.EstadisticasPage),
  },
  {
    path: 'reportar-perdido',
    loadComponent: () =>
      import('./pages/reportar-perdido/reportar-perdido.page').then((m) => m.default),
  },
  {
    path: 'reportar-celo',
    loadComponent: () =>
      import('./pages/reportar-celo/reportar-celo.page').then((m) => m.default),
  },
  {
    path: 'reportar-basura',
    loadComponent: () =>
      import('./pages/reportar-basura/reportar-basura.page').then((m) => m.default),
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./pages/notificaciones/notificaciones.page').then( m => m.NotificacionesPage)
  },

];