import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import {
  HomeComponent,
  FlashcardPageComponent,
  RegisterComponent,
  LoginComponent,
  ProfileComponent,
} from '@components/index';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flashcards', component: FlashcardPageComponent },
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
