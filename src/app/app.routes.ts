import { Routes } from '@angular/router';

export const routes: Routes = [
     {
          path: '',
          redirectTo: '/home',
          pathMatch: 'full'
     },
     {
          path: 'home',
          loadComponent: () => import('./features/home/home/home').then(c => c.Home)
     },
     {
          path: 'plays/:playId',
          loadComponent: () => import('./features/play/play-details/play-details')
               .then(m => m.PlayDetailsComponent)
     }
];
