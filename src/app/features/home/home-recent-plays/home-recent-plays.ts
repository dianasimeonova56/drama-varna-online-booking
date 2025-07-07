import { Component } from '@angular/core';
import { PlayItem } from "../../../shared/components/play-item/play-item";

@Component({
  selector: 'app-home-recent-plays',
  imports: [PlayItem],
  templateUrl: './home-recent-plays.html',
  styleUrl: './home-recent-plays.css'
})
export class HomeRecentPlays {
// when server is available, fetch the recent plays
}
