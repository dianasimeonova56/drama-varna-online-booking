import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayItem } from './play-item';

describe('PlayItem', () => {
  let component: PlayItem;
  let fixture: ComponentFixture<PlayItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
