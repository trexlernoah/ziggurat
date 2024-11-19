import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public user: firebase.User | null = null;

  constructor(private fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential) => {
        this.user = userCredential.user;

        return userCredential;
      })
    );
  }

  logout() {
    this.user = null;
    return from(this.fireAuth.signOut());
  }

  register(email: string, password: string) {
    return from(
      this.fireAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map((userCredential) => {
        this.user = userCredential.user;

        return userCredential;
      })
    );
  }
}
