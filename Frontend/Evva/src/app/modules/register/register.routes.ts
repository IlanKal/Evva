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
        path: 'supplier',
        loadComponent: () =>
            import('./components/register-supplier/register-supplier.component').then((m) => m.RegisterSupplierComponent),
        providers: [],
        data: {
            standaloneImports: [CommonModule, ReactiveFormsModule]
        }
    },


];