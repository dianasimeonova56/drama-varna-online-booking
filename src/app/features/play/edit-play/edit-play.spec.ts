import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlay } from './edit-play';

describe('EditPlay', () => {
  let component: EditPlay;
  let fixture: ComponentFixture<EditPlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
