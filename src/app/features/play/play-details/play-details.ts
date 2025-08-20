import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Play } from '../../../models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../../../shared/components";
import { AuthService, ErrorService } from '../../../core/services';
import { PlayDateFormatPipe } from "../../../shared/pipes/playDateFormat.pipe";
import { ShowIfUpcomingDirective } from '../../../shared/directives';

@Component({
  selector: 'app-play-details',
  imports: [RouterModule, CommonModule, StarRatingComponent, PlayDateFormatPipe, ShowIfUpcomingDirective],
  templateUrl: './play-details.html',
  styleUrl: './play-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayDetailsComponent {
  // @Input() play$!: Observable<Play | null>;
  play = signal<Play | null>(null);
  averageRating = signal(0);
  protected authService = inject(AuthService);
  protected playsService = inject(PlaysService);
  protected router = inject(Router);
  private errorService = inject(ErrorService);
  protected role = this.authService.getCurrentUserRole();

  availableSeats!: number | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const playId = this.route.snapshot.paramMap.get('playId');
    if (playId) {
      this.playsService.getPlay(playId).subscribe({
        next: (play) => {
          this.play.set(play);
          if (play?.ratings && play?.ratings.length > 0) {
            const total = play?.ratings.reduce((sum, r) => sum + r.rating, 0);
            this.averageRating.set(Number((total / play?.ratings.length).toFixed(2)));
          } else {
            this.averageRating.set(0)
          }
          this.availableSeats = play?.availableSeats;
        },
        error: (err) => {
         console.error("Failed to load play", err);
        }
      });
    }
  }

  onRatingUpdate(newAverage: number): void {
    if (!this.authService.isLoggedIn()) {
     this.errorService.setError('Guests cannot rate plays');
    }
    this.averageRating.set(newAverage);
  }

  deletePlay(playId: string): void {
    this.playsService.deletePlay(playId).subscribe(() => {
      this.router.navigate(['/plays']);
    });
  }
}
