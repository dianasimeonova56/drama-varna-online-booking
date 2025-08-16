import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Header, Footer, ErrorNotification } from "./shared/components/index";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, RouterOutlet, FontAwesomeModule, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ticketing-app';
}
