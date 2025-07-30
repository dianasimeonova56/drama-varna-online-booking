import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDetailsComponent } from './play-details';

describe('PlayDetails', () => {
  let component: PlayDetailsComponent;
  let fixture: ComponentFixture<PlayDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
