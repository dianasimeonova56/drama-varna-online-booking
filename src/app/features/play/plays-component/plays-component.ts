import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Play } from '../../../models';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';
import { PlayItem } from '../../../shared/components';
import { Search } from "../../search/search/search";

@Component({
  selector: 'app-plays-component',
  imports: [CommonModule, PlayItem, Search],
  templateUrl: './plays-component.html',
  styleUrl: './plays-component.css'
})
export class PlaysComponent {
  plays$: Observable<Play[]>;
  
  constructor(private playsService: PlaysService) {
    this.plays$ = this.playsService.plays$;
    this.playsService.getPlays().subscribe()
  }

  onSearch(filters: { playName?: string; director?: string; playDate?: Date }) {
    debugger
    if (filters.playName || filters.director || filters.playDate) {
      this.plays$ = this.playsService.searchPlays(filters.playName, filters.director, filters.playDate);
    } else {
      this.plays$ = this.playsService.getPlays();
    }
  }
}
