import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlashcardPageComponent } from './flashcards/flashcard-page/flashcard-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flashcards', component: FlashcardPageComponent },
];
