import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css',
  animations: [
    trigger('cardFlip', [
      state(
        'back',
        style({
          transform: 'rotateY(0)',
        })
      ),
      state(
        'front',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('back => front', [animate('200ms')]),
      transition('front => back', [animate('200ms')]),
    ]),
  ],
})
export class FlashcardComponent {
  protected isFlipped: boolean = true;

  public cardClicked() {
    this.isFlipped = !this.isFlipped;
  }
}
