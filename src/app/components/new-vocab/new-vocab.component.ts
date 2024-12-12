import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { emptyFlashcardSet, Flashcard, FlashcardSet } from '@models/flashcard';

@Component({
  selector: 'app-new-vocab',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-vocab.component.html',
  styleUrl: './new-vocab.component.scss',
})
export class NewVocabComponent {
  public set: FlashcardSet = emptyFlashcardSet;
  public idx: number = -1;

  public addRow(): void {
    this.set.push(new Flashcard());
  }

  public save(): void {
    return;
  }

  public del(i: number): void {
    this.set.splice(i, 1);
  }
}
