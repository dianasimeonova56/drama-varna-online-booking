import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysComponent } from './plays-component';

describe('PlaysComponent', () => {
  let component: PlaysComponent;
  let fixture: ComponentFixture<PlaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
