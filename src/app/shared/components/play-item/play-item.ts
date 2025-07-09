import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Play } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play-item',
  imports: [CommonModule],
  templateUrl: './play-item.html',
  styleUrl: './play-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayItem implements OnInit {
  @Input() play!: Play;
  
  ngOnInit(): void {
    console.log(this.play);
    
  }
}
