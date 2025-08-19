import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Play } from '../../../models';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';
import { PlayItem } from '../../../shared/components';
import { Search } from "../../search/search/search";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-plays-component',
  imports: [CommonModule, PlayItem, Search, FaIconComponent, MatTooltipModule],
  templateUrl: './plays-component.html',
  styleUrl: './plays-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaysComponent implements OnInit {
  plays$: Observable<Play[]>;
  upcomingPlays: Play[] = [];
  pastPlays: Play[] = [];
  today = new Date();
  showPlaysUpcoming = true;
  showPlaysPassed = false;
  faRepeat = faRepeat;
  loading = true;

  constructor(private playsService: PlaysService, private cdr: ChangeDetectorRef) {
    this.plays$ = this.playsService.plays$;
  }

  ngOnInit(): void {
    this.loading = true;
    this.playsService.getPlays().subscribe({
      next: (plays) => {
        this.upcomingPlays = plays.filter(p => new Date(p.playDate) >= this.today);
        this.pastPlays = plays.filter(p => new Date(p.playDate) < this.today);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
        throw new Error(`Failed to load plays: ${err}`)
      }
    });
  }

  changeVisiblePlays(): void {
    this.showPlaysUpcoming = !this.showPlaysUpcoming;
    this.showPlaysPassed = !this.showPlaysPassed;
  }

  onSearch(filters: { playName?: string; director?: string; playDate?: Date }) {
    const source$ = (filters.playName || filters.director || filters.playDate)
      ? this.playsService.searchPlays(filters.playName, filters.director, filters.playDate)
      : this.playsService.getPlays();

    source$.subscribe(plays => {
      this.upcomingPlays = plays.filter(p => new Date(p.playDate) >= this.today);
      this.pastPlays = plays.filter(p => new Date(p.playDate) < this.today);
      this.cdr.detectChanges();
    });
  }
}
