import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./shared/components/index";
import { HomeLanding } from "./features/home/home-landing/home-landing";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, HomeLanding],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ticketing-app';
}
