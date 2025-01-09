import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { emptyFlashcardSet, FlashcardSet } from '@models/flashcard';
import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, Toast, ButtonModule],
  providers: [MessageService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  public set!: FlashcardSet;
  public form!: FormGroup;

  public userCollection: FlashcardSet[] = [];

  private _idx = 0;
  public get idx() {
    return this._idx;
  }
  public set idx(i: number) {
    this._idx = i % this.set.cards.length;
    if (this._idx < 0) this._idx += this.set.cards.length;
  }

  @Input()
  public id!: string;

  constructor(
    private messageService: MessageService,
    private accountService: AccountService
  ) {}

  public ngOnInit(): void {
    this.accountService.userCollection.subscribe((collection) => {
      this.userCollection = collection;
      this.set = this.userCollection.at(+this.id) || emptyFlashcardSet;
    });

    this.form = new FormGroup({
      answer: new FormControl(''),
    });
  }

  public void(): void {
    return;
  }

  public onSubmit() {
    const answer = this.form.get('answer')?.value || '';
    if (answer === this.set.cards.at(this.idx)?.backText) {
      this.idx += 1;
      console.log('correct');
      this.messageService.add({
        severity: 'success',
        summary: 'Correct!',
        detail: '',
        life: 3000,
      });
      this.form.reset();
    } else {
      console.log('incorrect');
      this.messageService.add({
        severity: 'error',
        summary: 'Wrong!',
        detail: '',
        life: 3000,
      });
    }
  }
}
