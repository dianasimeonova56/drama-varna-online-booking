import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Play } from '../../../models';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';
import { PlayItem } from '../../../shared/components';

@Component({
  selector: 'app-plays-component',
  imports: [CommonModule, PlayItem],
  templateUrl: './plays-component.html',
  styleUrl: './plays-component.css'
})
export class PlaysComponent {
  plays$: Observable<Play[]>;
  
  constructor(private playsService: PlaysService) {
    this.plays$ = this.playsService.getPlays();
  }
}
