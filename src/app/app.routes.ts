import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  {
    path: 'items',
    loadComponent: () => import('./pages/items/items.component').then((c) => c.ItemsComponent),
  },
  {
    path: '**',
    redirectTo: 'items',
  },
];
