import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  emptyFlashcardSet,
  Flashcard,
  FlashcardCollection,
  FlashcardSet,
} from '@models/flashcard';
import { AccountService } from '@services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vocab',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './flashcard-set.component.html',
  styleUrl: './flashcard-set.component.scss',
})
export class FlashcardSetComponent implements OnInit {
  // TODO will be observable
  public title!: String;
  public cards!: Flashcard[];
  private collectionSubscription: Subscription;
  private userCollection: FlashcardCollection = [];

  private _idx = 0;
  public get idx() {
    return this._idx;
  }
  public set idx(i: number) {
    this._idx = i % this.cards.length;
    if (this._idx < 0) this._idx += this.cards.length;
  }

  private _id!: number;
  @Input()
  public set id(setId: string) {
    this._id = +setId;
    const flashcardSet: FlashcardSet =
      this.userCollection.at(+setId) || emptyFlashcardSet;
    // TODO
    this.title = flashcardSet?.title || 'ERROR';
    this.cards = flashcardSet?.cards || [];
  }
  public get id(): number {
    return this._id;
  }

  constructor(private accountService: AccountService) {
    this.collectionSubscription = this.accountService.userCollection.subscribe(
      (collection) => {
        this.userCollection = collection;
      }
    );
  }

  public ngOnInit(): void {
    return;
  }
}
