import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PollV1Component } from './poll-v1.component';

describe('PollV1Component', () => {
  let component: PollV1Component;
  let fixture: ComponentFixture<PollV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollV1Component],
      providers: [provideMockStore()],
    }).compileComponents();
    fixture = TestBed.createComponent(PollV1Component);
    component = fixture.componentInstance;
  });

  test('should render poll title and labels', () => {
    component.poll = {
      id: '42',
      title: 'Question',
      options: [
        { id: '1', label: 'Answer 1', voteCount: 10, userHasSelected: false },
        { id: '2', label: 'Answer 2', voteCount: 20, userHasSelected: false },
      ],
      isExpired: false,
    };
    fixture.detectChanges();

    const titleElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.poll-title'
    );
    expect(titleElement).toBeDefined();
    expect(titleElement?.textContent?.trim()).toBe('Question');
    const labelElements = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.option-label'
    );
    expect(labelElements).toHaveLength(2);
    expect(labelElements[0].textContent?.trim()).toBe('Answer 1');
    expect(labelElements[1].textContent?.trim()).toBe('Answer 2');
  });

  test('should hide percentages if not voted and not expired', () => {
    component.poll = {
      id: '42',
      title: 'Question',
      options: [
        { id: '1', label: 'Answer 1', voteCount: 10, userHasSelected: false },
        { id: '2', label: 'Answer 2', voteCount: 20, userHasSelected: false },
      ],
      isExpired: false,
    };
    fixture.detectChanges();

    const percentElements = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.option-percentage'
    );
    expect(percentElements).toHaveLength(0);
  });

  test('should show correct percentages if voted', () => {
    component.poll = {
      id: '42',
      title: 'Question',
      options: [
        { id: '1', label: 'Answer 1', voteCount: 10, userHasSelected: false },
        { id: '2', label: 'Answer 2', voteCount: 5, userHasSelected: true },
        { id: '3', label: 'Answer 3', voteCount: 5, userHasSelected: false },
      ],
      isExpired: false,
    };
    fixture.detectChanges();

    const percentElements = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.option-percentage'
    );
    expect(percentElements).toHaveLength(3);
    expect(percentElements[0].textContent?.trim()).toBe('50%');
    expect(percentElements[1].textContent?.trim()).toBe('25%');
    expect(percentElements[2].textContent?.trim()).toBe('25%');
  });

  test('should show correct percentages if expired', () => {
    component.poll = {
      id: '42',
      title: 'Question',
      options: [
        { id: '1', label: 'Answer 1', voteCount: 1, userHasSelected: false },
        { id: '2', label: 'Answer 2', voteCount: 2, userHasSelected: false },
        { id: '3', label: 'Answer 3', voteCount: 3, userHasSelected: false },
      ],
      isExpired: true,
    };
    fixture.detectChanges();

    const percentElements = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.option-percentage'
    );
    expect(percentElements).toHaveLength(3);
    expect(percentElements[0].textContent?.trim()).toBe('17%');
    expect(percentElements[1].textContent?.trim()).toBe('33%');
    expect(percentElements[2].textContent?.trim()).toBe('50%');
  });

  test('should highlight option user voted for', () => {
    component.poll = {
      id: '42',
      title: 'Question',
      options: [
        { id: '1', label: 'Answer 1', voteCount: 0, userHasSelected: false },
        { id: '2', label: 'Answer 2', voteCount: 1, userHasSelected: true },
      ],
      isExpired: false,
    };
    fixture.detectChanges();

    const barElements = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.option-bar'
    );
    expect(barElements).toHaveLength(2);
    expect(Array.from(barElements[0].classList)).not.toContain(
      'option-bar-selected'
    );
    expect(Array.from(barElements[1].classList)).toContain(
      'option-bar-selected'
    );
  });
});
