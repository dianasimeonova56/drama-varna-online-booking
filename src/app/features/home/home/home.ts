import { Component } from '@angular/core';
import { HomeLanding } from "../home-landing/home-landing";
import { HomeRecentPlays } from "../home-recent-plays/home-recent-plays";

@Component({
  selector: 'app-home',
  imports: [HomeLanding, HomeRecentPlays],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
