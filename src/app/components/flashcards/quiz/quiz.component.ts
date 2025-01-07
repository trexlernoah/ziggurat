import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  emptyFlashcardSet,
  FlashcardCollection,
  FlashcardSet,
} from '@models/flashcard';
import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  public set!: FlashcardSet;
  public idx: number = 0;
  public form!: FormGroup;

  public userCollection: FlashcardCollection = [];

  @Input()
  public id!: string;

  constructor(private accountService: AccountService) {
    this.accountService.userCollection.subscribe((collection) => {
      this.userCollection = collection;
    });
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl(''),
    });

    this.set = this.userCollection.at(+this.id) || emptyFlashcardSet;
  }

  public onSubmit() {
    const answer = this.form.get('answer')?.value || '';
    if (answer === this.set.cards.at(this.idx)?.backText) {
      this.idx += 1;
      // Correct
      this.form.reset();
    } else {
      console.log('wrong');
    }
  }
}
