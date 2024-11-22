import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-flashcard-page',
  standalone: true,
  imports: [FlashcardComponent, MatButtonModule, MatIconModule],
  templateUrl: './flashcard-page.component.html',
  styleUrl: './flashcard-page.component.css',
})
export class FlashcardPageComponent {}
