import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetComponent } from './flashcard-set.component';

describe('VocabComponent', () => {
  let component: FlashcardSetComponent;
  let fixture: ComponentFixture<FlashcardSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardSetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
