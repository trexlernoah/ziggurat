import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlashcardPageComponent } from './flashcards/flashcard-page/flashcard-page.component';
import { AccountLayoutComponent } from './account/account-layout/account-layout.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';

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
