import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css',
  animations: [
    trigger('cardFlip', [
      state(
        'back',
        style({
          transform: 'none',
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
