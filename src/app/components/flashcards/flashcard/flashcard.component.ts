import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flashcard, FlashcardMode } from '@models/flashcard';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [NgClass, FormsModule],
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
  @Input() card?: Flashcard;
  @Input() mode!: FlashcardMode;
  protected isFlipped: boolean = true;

  public cardClicked() {
    this.isFlipped = !this.isFlipped;
  }
}
