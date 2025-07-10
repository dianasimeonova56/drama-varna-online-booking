import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Play } from '../../../models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlaysService } from '../../../core/services/plays.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../../../shared/components";

@Component({
  selector: 'app-play-details',
  imports: [RouterModule, CommonModule, StarRatingComponent],
  templateUrl: './play-details.html',
  styleUrl: './play-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayDetailsComponent {
  @Input() play$!: Observable<Play>;
  averageRating!: number;

  //spinner?
  constructor(private route: ActivatedRoute,
    private playsService: PlaysService) {}

  ngOnInit(): void {
    const playId = this.route.snapshot.paramMap.get('playId');
    if (playId) {
      this.play$ = this.playsService.getPlay(playId);
    }

    this.play$.subscribe({
      next: (play) => {
        if (play.ratings && play.ratings.length > 0) {
          const total = play.ratings.reduce((sum, r) => sum + r.rating, 0);
          this.averageRating = total / play.ratings.length;
        } else {
          this.averageRating = 0;
        }
      },
      error: (err) => console.error('Failed to load play', err)
    });
  }
}
