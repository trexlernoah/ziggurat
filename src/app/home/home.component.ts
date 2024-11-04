import { Component } from '@angular/core';
import { FlashcardPageComponent } from '../flashcards/flashcard-page/flashcard-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlashcardPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
