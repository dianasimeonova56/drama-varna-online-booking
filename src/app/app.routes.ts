import { Routes } from '@angular/router';
import { NotFound } from './shared/components/index';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards';

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
          path: 'login',
          loadComponent: () => import('./features/auth/login/login').then(c => c.Login),
          canActivate: [guestGuard]
     },
     {
          path: 'register',
          loadComponent: () => import('./features/auth/register/register').then(c => c.Register),
          canActivate: [guestGuard]
     },
     {
          path: 'profile',
          loadComponent: () => import('./features/profile/user-profile/user-profile').then(c => c.UserProfile),
          canActivate: [authGuard],
          data: { roles: ['user'] }
     },
     {
          path: 'plays',
          loadComponent: () => import('./features/play/plays-component/plays-component')
               .then(m => m.PlaysComponent)
     },
     {
          path: 'plays/create',
          loadComponent: () => import('./features/play/create-play/create-play')
               .then(m => m.CreatePlay),
          canActivate: [roleGuard, authGuard],
          data: { roles: ['admin'] }
     },
     {
          path: 'plays/edit/:playId',
          loadComponent: () => import('./features/play/edit-play/edit-play')
               .then(m => m.EditPlay),
          canActivate: [roleGuard, authGuard],
          data: { roles: ['admin'] }
     },
     {
          path: 'plays/:playId',
          loadComponent: () => import('./features/play/play-details/play-details')
               .then(m => m.PlayDetailsComponent)
     },
     {
          path: 'book/:playId',
          loadComponent: () => import('./features/booking/book-ticket/book-ticket')
               .then(m => m.BookTicket),
          canActivate: [authGuard, roleGuard],
          data: { roles: ['user'] }
     },
     {
          path: 'confirmation',
          loadComponent: () => import('./features/booking/confirmation/confirmation')
               .then(m => m.Confirmation),
          canActivate: [authGuard, roleGuard],
          data: { roles: ['user'] }
     },
     {
          path: 'logout',
          redirectTo: '/home',
          pathMatch: 'full'
     },
     {
          path: '**',
          component: NotFound
     }
];
