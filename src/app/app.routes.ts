import { Routes } from '@angular/router';
import { Home } from './features/home/index';
import { PlaysComponent } from './features/play/plays-component/plays-component';
import { PlayDetailsComponent } from './features/play/play-details/play-details';

export const routes: Routes = [
     { path: '', component: Home },
     { path: 'plays', component: PlaysComponent },
     { path: 'play-details/:playId', component: PlayDetailsComponent}
];
