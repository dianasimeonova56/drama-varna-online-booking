import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayItem } from "../../../shared/components/play-item/play-item";
import { Observable } from 'rxjs';
import { Play } from '../../../models/play.model';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-recent-plays',
  imports: [PlayItem, CommonModule],
  templateUrl: './home-recent-plays.html',
  styleUrl: './home-recent-plays.css'
})
export class HomeRecentPlays {
// when server is available, fetch the recent plays
  play$: Observable<Play[]>;

  constructor(private playsService: PlaysService) {
    this.play$ = this.playsService.plays$;
    this.playsService.getLatestPlays(2).subscribe();
  }
}
