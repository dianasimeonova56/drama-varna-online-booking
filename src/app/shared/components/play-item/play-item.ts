import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Play } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayDateFormatPipe } from '../../pipes'

@Component({
  selector: 'app-play-item',
  imports: [CommonModule, RouterModule, PlayDateFormatPipe],
  templateUrl: './play-item.html',
  styleUrl: './play-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayItem implements OnInit {
  @Input() play!: Play | null;

  ngOnInit(): void {
  }
}
