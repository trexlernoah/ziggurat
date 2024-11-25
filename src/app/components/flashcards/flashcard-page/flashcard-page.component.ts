import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FlashcardComponent } from '@components/index';
import { FlashcardMode, FlashcardSet } from '@models/flashcard';

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

  public ngOnInit(): void {
    // TODO get flash card set
    this.flashcardSet = [
      {
        frontText: 'Hello',
        backText: 'Hola',
      },
    ];
    console.log(this.mode);
  }
}
