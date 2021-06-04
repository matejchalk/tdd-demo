import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollV1Component } from './poll-v1.component';

describe('PollV1Component', () => {
  let component: PollV1Component;
  let fixture: ComponentFixture<PollV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollV1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
