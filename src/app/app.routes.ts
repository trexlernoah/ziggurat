import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import {
  HomeComponent,
  FlashcardPageComponent,
  RegisterComponent,
  LoginComponent,
  ProfileComponent,
} from '@components/index';
import { VocabComponent } from '@components/vocab/vocab.component';
import { NewVocabComponent } from '@components/new-vocab/new-vocab.component';
import { QuizComponent } from '@components/quiz/quiz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flashcards', component: FlashcardPageComponent },
  { path: 'vocab/:id', component: VocabComponent },
  { path: 'new-set', component: NewVocabComponent },
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
