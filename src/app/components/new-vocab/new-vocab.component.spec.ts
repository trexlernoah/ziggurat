import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVocabComponent } from './new-vocab.component';

describe('NewVocabComponent', () => {
  let component: NewVocabComponent;
  let fixture: ComponentFixture<NewVocabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVocabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
