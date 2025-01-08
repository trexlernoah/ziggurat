import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import {
  HomeComponent,
  FlashcardPageComponent,
  RegisterComponent,
  LoginComponent,
  ProfileComponent,
} from '@components/index';
import { QuizComponent } from '@components/flashcards/quiz/quiz.component';
import { NewSetComponent } from '@components/flashcards/new-set/new-set.component';
import { FlashcardSetComponent } from '@components/flashcards/flashcard-set/flashcard-set.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flashcards', component: FlashcardPageComponent },
  { path: 'set/:id', component: FlashcardSetComponent },
  { path: 'new-set', component: NewSetComponent },
  { path: 'quiz/:id', component: QuizComponent },
  {
    path: 'account',
    canActivateChild: [authGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },

      { path: 'profile', component: ProfileComponent },
    ],
  },
  { path: '**', component: HomeComponent },
];
