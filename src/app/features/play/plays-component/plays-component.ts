import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Play } from '../../../models';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';
import { PlayItem } from '../../../shared/components';
import { Search } from "../../search/search/search";

@Component({
  selector: 'app-plays-component',
  imports: [CommonModule, PlayItem, Search],
  templateUrl: './plays-component.html',
  styleUrl: './plays-component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlaysComponent implements OnInit {
  plays$: Observable<Play[]>;
  upcomingPlays: Play[] = [];
  pastPlays: Play[] = [];
  today = new Date();
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
        console.log(this.upcomingPlays);
        console.log(this.pastPlays);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load plays', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSearch(filters: { playName?: string; director?: string; playDate?: Date }) {
    const source$ = (filters.playName || filters.director || filters.playDate)
      ? this.playsService.searchPlays(filters.playName, filters.director, filters.playDate)
      : this.playsService.getPlays();

    source$.subscribe(plays => {
      this.upcomingPlays = plays.filter(p => new Date(p.playDate) >= this.today);
      this.pastPlays = plays.filter(p => new Date(p.playDate) < this.today);
      this.cdr.markForCheck(); // force refresh
    });
  }
}
