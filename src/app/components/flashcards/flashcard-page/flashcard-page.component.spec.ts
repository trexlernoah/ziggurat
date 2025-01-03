import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardPageComponent } from './flashcard-page.component';

describe('FlashcardPageComponent', () => {
  let component: FlashcardPageComponent;
  let fixture: ComponentFixture<FlashcardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
