import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/register/register.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./modules/chat/components/chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'my-events',
    loadComponent: () =>
      import('./modules/my-events/my-events.component').then((m) => m.MyEventsComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];