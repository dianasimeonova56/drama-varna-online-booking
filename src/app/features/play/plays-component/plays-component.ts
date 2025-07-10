import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Play } from '../../../models';
import { PlaysService } from '../../../core/services/plays.service';

@Component({
  selector: 'app-plays-component',
  imports: [],
  templateUrl: './plays-component.html',
  styleUrl: './plays-component.css'
})
export class PlaysComponent {
  plays$: Observable<Play[]>;
  
  constructor(private playsService: PlaysService) {
    this.plays$ = this.playsService.getPlays();
    console.log(this.plays$);
    
  }
}
