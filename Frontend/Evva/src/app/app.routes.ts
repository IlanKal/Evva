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
  {
    path: 'event-results/:requestId',
    loadComponent: () =>
      import('./modules/event-results/event-results.component').then(m => m.EventResultsComponent),
  },
  {
    path: 'rate-page/guest/:guestId/:eventId',
    loadComponent: () =>
      import('./modules/rate/components/rate/rate.component').then((m) => m.RateComponent),
  },
  {
    path: 'rate-page/thank-you',
    loadComponent: () =>
      import('./modules/rate/components/thank-you/thank-you.component').then(m => m.ThankYouComponent)
  },
  {
    path: 'rate-page/user/:userId/:eventId',
    loadComponent: () =>
      import('./modules/rate/components/rate/rate.component').then((m) => m.RateComponent),
  },
  {
    path: 'profile/user',
    loadComponent: () =>
      import('./modules/profile/user/user-profile.component').then(m => m.UserProfileComponent),
  },
  {
    path: 'profile/supplier',
    loadComponent: () =>
      import('./modules/profile/supplier/supplier-profile.component').then(m => m.SupplierProfileComponent),
  },
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
  path: 'supplier-home',
  loadComponent: () =>
    import('./modules/supplier-home/supplier-home.component').then((m) => m.SupplierHomeComponent),
}
 

 
];