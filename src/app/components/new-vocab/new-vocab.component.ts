import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { emptyFlashcardSet, Flashcard, FlashcardSet } from '@models/flashcard';
import { generateWordsResponse, VocabService } from '@services/index';

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

  constructor(private vocabService: VocabService) {}

  public addRow(): void {
    this.set.push(new Flashcard());
  }

  public save(): void {
    return;
  }

  public del(i: number): void {
    this.set.splice(i, 1);
  }

  public generateWords(text: string) {
    this.vocabService.generateWords(text).subscribe((res) => {
      console.log(res);
      this.set = this.createSet(res);
    });
  }

  // TODO move this
  public createSet(res: any) {
    let set: FlashcardSet = [];
    for (let word of res) {
      console.log(word);
      set.push(new Flashcard(word.english_word, word.translation));
    }
    return set;
  }
}
