import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingItem } from './booking-item';

describe('BookingItem', () => {
  let component: BookingItem;
  let fixture: ComponentFixture<BookingItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
