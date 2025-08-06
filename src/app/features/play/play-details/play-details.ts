import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { Play } from '../../../models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaysService } from '../../../core/services/plays.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../../../shared/components";
import { AuthService } from '../../../core/services';
import { PlayDateFormatPipe } from "../../../shared/pipes/playDateFormat.pipe";

@Component({
  selector: 'app-play-details',
  imports: [RouterModule, CommonModule, StarRatingComponent, PlayDateFormatPipe],
  templateUrl: './play-details.html',
  styleUrl: './play-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayDetailsComponent {
  @Input() play$!: Observable<Play|null>;
  averageRating = signal(0);
  protected authService = inject(AuthService);
  protected playsService = inject(PlaysService);
  protected router = inject(Router);
  protected role = this.authService.getCurrentUserRole();

  //spinner?
  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    const playId = this.route.snapshot.paramMap.get('playId');
    if (playId) {
      this.play$ = this.playsService.getPlay(playId);
    }

    this.play$.subscribe({
      next: (play) => {
        if (play?.ratings && play?.ratings.length > 0) {
          const total = play?.ratings.reduce((sum, r) => sum + r.rating, 0);
          this.averageRating.set(Number((total / play?.ratings.length).toFixed(2)));
        } else {
          this.averageRating.set(0)
        }
      },
      error: (err) => console.error('Failed to load play', err)
    });
  }

  onRatingUpdate(newAverage: number): void {
    this.averageRating.set(newAverage);
  }

  deletePlay(playId: string): void {
    this.playsService.deletePlay(playId).subscribe(() => {
      this.router.navigate(['/plays']);
    });
  }
}
