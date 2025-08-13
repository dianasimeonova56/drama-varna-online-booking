import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowIfUpcoming]',
  standalone: true
})
export class ShowIfUpcomingDirective implements OnInit {
  @Input() playDate!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const now = new Date();
    const playDate = new Date(this.playDate);

    if (playDate < now) {
      this.renderer.addClass(this.el.nativeElement, 'hidden');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'hidden');
    }
  }
}
