import { Injectable, OnDestroy } from '@angular/core';

import {
  BehaviorSubject,
  defer,
  from,
  mergeMap,
  Observable,
  of,
  Subscription,
} from 'rxjs';

import {
  Database,
  DataSnapshot,
  getDatabase,
  onValue,
  push,
  ref,
  update,
} from '@angular/fire/database';

import {
  Auth,
  User,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { FlashcardSet } from '@models/flashcard';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnDestroy {
  public user$: Observable<User>;
  userSubscription: Subscription;

  public userCollection: BehaviorSubject<FlashcardSet[]> = new BehaviorSubject(
    [] as FlashcardSet[]
  );

  constructor(private auth: Auth, private database: Database) {
    this.user$ = user(this.auth);
    this.database = getDatabase();
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      // https://firebase.google.com/docs/database/web/read-and-write#web_8

      onValue(
        ref(this.database, `/users/${aUser?.uid}`),
        (snapshot: DataSnapshot) => {
          const collection =
            (snapshot.val() && snapshot.val().collection) || {};
          const map: FlashcardSet[] = Object.keys(collection).map(
            (key) => collection[key]
          );
          console.log(collection);
          console.log(map);
          this.userCollection.next(map);
        }
      );
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public login(email: string, password: string) {
    return this.wrap(signInWithEmailAndPassword(this.auth, email, password));
  }

  public logout() {
    return this.wrap(signOut(this.auth));
  }

  public register(email: string, password: string) {
    return this.wrap(
      createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  public addFlashcardSet(flashcardSet: FlashcardSet) {
    return this.user$.pipe(
      mergeMap((user) => {
        if (!user) return of({ success: false, error: 'User is null' });

        const key = push(
          ref(this.database),
          `users/${user.uid}/collection`
        ).key;

        return this.wrap(
          update(
            ref(this.database, `users/${user.uid}/collection/${key}`),
            flashcardSet
          )
        );
      })
    );
  }

  private wrap = (_p: Promise<any>) =>
    defer(() =>
      from(
        _p
          .then((value) => ({ success: true, value }))
          .catch((error) => {
            console.log(error);
            return { success: false, error };
          })
      )
    );
}
