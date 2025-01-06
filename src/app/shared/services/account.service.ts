import { Inject, inject, Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  BehaviorSubject,
  defer,
  from,
  map,
  Observable,
  Subject,
  Subscription,
  take,
} from 'rxjs';

import firebase from 'firebase/compat/app';
import {
  child,
  Database,
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from '@angular/fire/database';
import { Auth, User, user } from '@angular/fire/auth';
import { FlashcardCollection, FlashcardSet } from '@models/flashcard';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnDestroy {
  public authState$: Observable<firebase.User | null>;
  private auth: Auth = inject(Auth);
  public user$: Observable<User> = user(this.auth);
  private database = inject(Database);
  userSubscription: Subscription;

  public userCollection: BehaviorSubject<FlashcardCollection> =
    new BehaviorSubject([] as FlashcardCollection);

  constructor(private fireAuth: AngularFireAuth) {
    this.authState$ = this.fireAuth.authState;
    this.database = getDatabase();
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser);
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
    this.user$
      .pipe(
        map((user) => {
          if (user) {
            set(ref(this.database, `users/${user.uid}`), {
              email: user.email,
              collection: [flashcardSet],
            });
          }
        })
      )
      .subscribe();
  }

  private wrap = (_p: Promise<any>) => defer(() => from(_p));
}
