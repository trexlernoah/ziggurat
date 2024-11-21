import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { defer, from, Observable } from 'rxjs';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public authState$: Observable<firebase.User | null>;

  constructor(private fireAuth: AngularFireAuth) {
    this.authState$ = this.fireAuth.authState;
  }

  public login(email: string, password: string) {
    return this.wrap(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  public logout() {
    return this.wrap(this.fireAuth.signOut());
  }

  public register(email: string, password: string) {
    return this.wrap(
      this.fireAuth.createUserWithEmailAndPassword(email, password)
    );
  }

  private wrap = (_p: Promise<any>) => defer(() => from(_p));
}
