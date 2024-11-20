import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlashcardPageComponent } from './components/flashcards/flashcard-page/flashcard-page.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flashcards', component: FlashcardPageComponent },
  {
    path: 'account',
    component: AccountLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];
