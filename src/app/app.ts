import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./shared/components/index";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ticketing-app';
}
