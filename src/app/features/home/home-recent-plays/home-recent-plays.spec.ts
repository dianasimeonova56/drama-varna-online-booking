import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecentPlays } from './home-recent-plays';

describe('HomeRecentPlays', () => {
  let component: HomeRecentPlays;
  let fixture: ComponentFixture<HomeRecentPlays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRecentPlays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRecentPlays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
