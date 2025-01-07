import { Injectable, OnDestroy } from '@angular/core';

import {
  BehaviorSubject,
  defer,
  from,
  map,
  Observable,
  Subscription,
  take,
} from 'rxjs';

import {
  Database,
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  set,
} from '@angular/fire/database';
import {
  Auth,
  User,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { FlashcardCollection, FlashcardSet } from '@models/flashcard';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnDestroy {
  public user$: Observable<User>;
  userSubscription: Subscription;

  public userCollection: BehaviorSubject<FlashcardCollection> =
    new BehaviorSubject([] as FlashcardCollection);

  constructor(private auth: Auth, private database: Database) {
    this.user$ = user(this.auth);
    // this.authState$ = ;
    this.database = getDatabase();
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      // https://firebase.google.com/docs/database/web/read-and-write#web_8
      onValue(
        ref(this.database, `/users/${aUser?.uid}`),
        (snapshot: DataSnapshot) => {
          const collection =
            (snapshot.val() && snapshot.val().collection) || [];
          this.userCollection.next(collection);
        },
        { onlyOnce: true }
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

  public initializeUser(): void {
    // TODO so fucking bad
    this.user$.pipe(take(1)).subscribe((user) => {
      set(ref(this.database, 'users/' + user.uid), {
        email: user.email,
        collection: [],
      });
    });
  }

  // public getFlashcardSets(): FlashcardCollection {
  //   this.user$.pipe(map((user) => {
  //     if (user) {

  //     }
  //   }));
  // }

  public addFlashcardSet(flashcardSet: FlashcardSet) {
    return this.user$.pipe(
      map((user) => {
        if (!user) return null;

        // TODO set to update
        return set(ref(this.database, `users/${user.uid}`), {
          email: user.email,
          collection: [flashcardSet],
        });
      })
    );
  }

  private wrap = (_p: Promise<any>) => defer(() => from(_p));
}
