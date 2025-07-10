import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDetails } from './play-details';

describe('PlayDetails', () => {
  let component: PlayDetails;
  let fixture: ComponentFixture<PlayDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
