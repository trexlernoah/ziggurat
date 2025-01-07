import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { emptyFlashcardSet, Flashcard, FlashcardSet } from '@models/flashcard';
import { AccountService, PromptService } from '@services/index';

@Component({
  selector: 'app-new-set',
  standalone: true,
  imports: [NgIf, FormsModule, MatProgressSpinnerModule],
  templateUrl: './new-set.component.html',
  styleUrl: './new-set.component.scss',
})
export class NewSetComponent {
  public set: FlashcardSet = emptyFlashcardSet;
  public idx: number = -1;
  public loading = false;

  constructor(
    private promptService: PromptService,
    private accountService: AccountService
  ) {}

  public addRow(): void {
    this.set.cards.push(new Flashcard());
  }

  public save(): void {
    this.set.title = this.set.title || 'New Set';
    this.accountService.addFlashcardSet(this.set).subscribe((res) => {
      if (res == null) {
        console.log('must log in!');
      }
      console.log(res);
    });
  }

  public del(i: number): void {
    this.set.cards.splice(i, 1);
  }

  public generateWords(text: string) {
    // TODO move this
    if (!text) return;
    this.loading = true;
    this.promptService.generateWords(text).subscribe((res) => {
      this.set = { title: '', cards: this.createSet(res) };
      this.loading = false;
    });
  }

  // TODO move this
  public createSet(res: any) {
    let cards: Flashcard[] = [];
    for (let word of res) {
      cards.push(new Flashcard(word.english_word, word.translation));
    }
    return cards;
  }
}
