import { Routes } from '@angular/router';

export const registerRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/register-main/register-main.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'client',
    loadComponent: () =>
      import('./components/register-client/register-client.component').then((m) => m.RegisterClientComponent),
  },
  {
    path: 'supplier',
    loadComponent: () =>
      import('./components/register-supplier/register-supplier.component').then((m) => m.RegisterSupplierComponent),
  },
];
