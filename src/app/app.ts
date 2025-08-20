import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Header, Footer, ErrorNotification } from "./shared/components/index";
import { routeTransition } from './shared/animation/route-transition';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, RouterOutlet, FontAwesomeModule, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    routeTransition
  ]
})
export class App {
  protected title = 'ticketing-app';
  constructor(protected route: ActivatedRoute) {
  }
}
