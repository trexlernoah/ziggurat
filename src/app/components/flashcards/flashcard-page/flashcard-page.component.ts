import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FlashcardSet } from '@models/flashcard';
import { RouterLink } from '@angular/router';
import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-flashcard-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './flashcard-page.component.html',
  styleUrl: './flashcard-page.component.scss',
})
export class FlashcardPageComponent implements OnInit {
  public collection!: FlashcardSet[];

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    // TODO get flash card set
    this.accountService.userCollection.subscribe((collection) => {
      this.collection = collection;
    });
  }
}
