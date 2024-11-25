import { Component, OnInit } from '@angular/core';

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
} from '@models/flashcard';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-flashcard-page',
  standalone: true,
  imports: [
    FlashcardComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './flashcard-page.component.html',
  styleUrl: './flashcard-page.component.css',
})
export class FlashcardPageComponent implements OnInit {
  public flashcardSet!: FlashcardSet;
  public mode: FlashcardMode = FlashcardMode.MAIN;

  constructor(private dialog: MatDialog) {}

  public ngOnInit(): void {
    // TODO get flash card set
    this.flashcardSet = mockFlashcardSet;
  }

  public addCard(): void {
    const dialogRef = this.dialog.open(AddFlashcardDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) this.flashcardSet.push(result);
    });
  }
}
