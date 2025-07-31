import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlay } from './create-play';

describe('CreatePlay', () => {
  let component: CreatePlay;
  let fixture: ComponentFixture<CreatePlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
