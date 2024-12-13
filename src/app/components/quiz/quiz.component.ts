import { Component, Input } from '@angular/core';
import {
  emptyFlashcardSet,
  FlashcardSet,
  mockVocabSets,
} from '@models/flashcard';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  public set!: FlashcardSet;

  @Input()
  set id(setId: string) {
    this.set = mockVocabSets.at(+setId)?.set || emptyFlashcardSet;
  }
}
