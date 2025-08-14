import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating-component',
  imports: [FaIconComponent, CommonModule],
  templateUrl: './star-rating-component.html',
  styleUrl: './star-rating-component.css'
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number | null;
  @Input() playId!: string;
  @Output() ratingUpdated = new EventEmitter<number>();
  faStar = faStar;
  hasRated = false;
  justRated = false;
  triedToRateAgain = false;

  constructor(private playsService: PlaysService) { }

  ngOnInit() {
    this.playsService.getUserRating(this.playId).subscribe({
      next: ({ hasRated }) => {
        //TODO log message
        this.hasRated = hasRated;
      },
      error: (err) => console.error(err)
    })
  }

  setRating(value: number) {
    if (this.hasRated) {
      this.triedToRateAgain = true;
    };

    this.hasRated = true;

    this.playsService.addRating(this.playId, value)
      .subscribe({
        next: response => {
          const newAverage = response.averageRating;
          this.rating = Number(newAverage.toFixed(2));
          this.ratingUpdated.emit(newAverage)
          this.justRated = true;
        },
        error: err => {
          console.error(err)
          this.justRated = false;
        }
      })
  }


}
