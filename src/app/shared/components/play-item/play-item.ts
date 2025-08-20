import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Play } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayDateFormatPipe } from '../../pipes'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-play-item',
  imports: [CommonModule, RouterModule, PlayDateFormatPipe, MatProgressSpinnerModule],
  templateUrl: './play-item.html',
  styleUrl: './play-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayItem implements OnInit {
  @Input() play!: Play | null;
  loading = true;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }
}
