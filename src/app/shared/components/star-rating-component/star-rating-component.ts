import { Component, Input, OnInit } from '@angular/core';
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
export class StarRatingComponent{
  @Input() rating!: number;
  @Input() playId!: string;
  faStar = faStar;

  constructor(private playsService: PlaysService) { }


  setRating(value: number) {
    console.log("fired");
    
    this.rating = value
    this.playsService.addRating(this.playId, value)
    .subscribe({
      next: updatedPlay => {
        console.log(updatedPlay);
        
      },
      error: err => console.error(err)
    })
  }


}
