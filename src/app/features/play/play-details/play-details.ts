import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Play } from '../../../models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlaysService } from '../../../core/services/plays.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './play-details.html',
  styleUrl: './play-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayDetailsComponent {
  @Input() play$!: Observable<Play>;

  //spinner?
  constructor(private route: ActivatedRoute,
    private playsService: PlaysService) {}

  ngOnInit(): void {
    const playId = this.route.snapshot.paramMap.get('playId');
    if (playId) {
      this.play$ = this.playsService.getPlay(playId);
    }
  }
}
