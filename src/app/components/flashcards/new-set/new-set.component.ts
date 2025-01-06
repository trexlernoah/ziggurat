import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { emptyFlashcardSet, Flashcard, FlashcardSet } from '@models/flashcard';
import { AccountService, PromptService } from '@services/index';

import { Database, getDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-new-set',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-set.component.html',
  styleUrl: './new-set.component.scss',
})
export class NewSetComponent {
  public set: FlashcardSet = emptyFlashcardSet;
  public idx: number = -1;

  constructor(
    private promptService: PromptService,
    private accountService: AccountService
  ) {}

  public addRow(): void {
    this.set.cards.push(new Flashcard());
  }

  public save(): void {
    this.accountService.addFlashcardSet(this.set);
  }

  public del(i: number): void {
    this.set.cards.splice(i, 1);
  }

  public generateWords(text: string) {
    this.promptService.generateWords(text).subscribe((res) => {
      console.log(res);
      this.set = { title: '', cards: this.createSet(res) };
    });
  }

  // TODO move this
  public createSet(res: any) {
    let cards: Flashcard[] = [];
    for (let word of res) {
      console.log(word);
      cards.push(new Flashcard(word.english_word, word.translation));
    }
    return cards;
  }
}
