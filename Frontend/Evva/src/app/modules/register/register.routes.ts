import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    providers: [],
    data: {
      standaloneImports: [CommonModule, ReactiveFormsModule]
    }
  },
  {
    path: 'supplier/step1',
    loadComponent: () =>
      import('./components/register-supplier/register-supplier-step1/register-supplier-step1.component').then((m) => m.RegisterSupplierStep1Component),
    providers: [],
    data: {
      standaloneImports: [CommonModule, ReactiveFormsModule]
    }
  },
  {
    path: 'supplier/step2',
    loadComponent: () =>
      import('./components/register-supplier/register-supplier-step2/register-supplier-step2.component').then((m) => m.RegisterSupplierStep2Component),
    providers: [],
    data: {
      standaloneImports: [CommonModule, ReactiveFormsModule]
    }
  },
];