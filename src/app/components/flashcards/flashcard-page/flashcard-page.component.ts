import { Component, OnInit } from '@angular/core';

import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  AddFlashcardDialogComponent,
  FlashcardComponent,
} from '@components/index';
import {
  FlashcardMode,
  FlashcardSet,
  mockFlashcardSet,
  mockVocabSets,
  VocabSets,
} from '@models/flashcard';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flashcard-page',
  standalone: true,
  imports: [
    FlashcardComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './flashcard-page.component.html',
  styleUrl: './flashcard-page.component.scss',
  animations: [
    trigger('nextCard', [
      transition(':increment', [
        query('.text', [style({ color: 'white' })]),
        animate(
          '200ms ease-in',
          style({ transform: 'rotateY(-180deg)', opacity: 0 })
        ),
      ]),
      transition(':decrement', [
        query('.text', [style({ color: 'white' })]),
        animate(
          '200ms ease-in',
          style({ transform: 'rotateY(180deg)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class FlashcardPageComponent implements OnInit {
  public flashcardSet!: FlashcardSet;
  public vocabSets!: VocabSets;
  public mode: FlashcardMode = FlashcardMode.STUDY;

  private _idx = 0;
  public get studyCardIdx() {
    return this._idx;
  } // TODO add animation here
  public set studyCardIdx(idx: number) {
    this._idx = idx % this.flashcardSet.length;
    if (this._idx < 0) this._idx += this.flashcardSet.length;
  }

  constructor(private dialog: MatDialog) {}

  public ngOnInit(): void {
    // TODO get flash card set
    this.flashcardSet = mockFlashcardSet;
    this.vocabSets = mockVocabSets;
  }

  public switchMode(): void {
    // TODO can add an animation to this
    this.mode ^= 1;
  }

  public addCard(): void {
    const dialogRef = this.dialog.open(AddFlashcardDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) this.flashcardSet.push(result);
    });
  }
}
