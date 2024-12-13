import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  emptyFlashcardSet,
  FlashcardSet,
  mockVocabSets,
} from '@models/flashcard';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  public set!: FlashcardSet;
  public idx: number = 0;
  public form!: FormGroup;

  @Input()
  set id(setId: string) {
    this.set = mockVocabSets.at(+setId)?.set || emptyFlashcardSet;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl(''),
    });
  }

  public onSubmit() {
    const answer = this.form.get('answer')?.value || '';
    if (answer === this.set.at(this.idx)?.backText) {
      this.idx += 1;
      // Correct
      this.form.reset();
    } else {
      console.log('wrong');
    }
  }
}
