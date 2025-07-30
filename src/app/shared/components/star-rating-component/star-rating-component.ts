import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { PlaysService } from '../../../core/services/plays.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-star-rating-component',
  imports: [FaIconComponent],
  templateUrl: './star-rating-component.html',
  styleUrl: './star-rating-component.css'
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number;
  @Input() playId!: string;
  @Output() ratingUpdated = new EventEmitter<number>();
  faStar = faStar;
  hasRated = false;

  constructor(private playsService: PlaysService) { }

  ngOnInit() {
    // Check localStorage to see if user has already rated this play
    this.hasRated = !!localStorage.getItem(`rated-${this.playId}`);
  }

  setRating(value: number) {
    
    if (this.hasRated) return;

    this.hasRated = true;
    localStorage.setItem(`rated-${this.playId}`, 'true');

    this.playsService.addRating(this.playId, value)
      .subscribe({
        next: response => {
          const newAverage = response.averageRating;
          this.rating = Number(newAverage.toFixed(2));
          this.ratingUpdated.emit(newAverage)
        },
        error: err => {
          console.error(err)
          this.hasRated = false; // unblock on error
          localStorage.removeItem(`rated-${this.playId}`);
        }
      })
  }


}
