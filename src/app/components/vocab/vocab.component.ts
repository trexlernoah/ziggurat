import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlashcardSet, mockVocabSets } from '@models/flashcard';

@Component({
  selector: 'app-vocab',
  standalone: true,
  imports: [NgClass],
  templateUrl: './vocab.component.html',
  styleUrl: './vocab.component.scss',
})
export class VocabComponent {
  // TODO will be observable
  public title!: String;
  public set!: FlashcardSet;

  private _idx = 0;
  public get idx() {
    return this._idx;
  }
  public set idx(i: number) {
    this._idx = i % this.set.length;
    if (this._idx < 0) this._idx += this.set.length;
  }

  @Input()
  set id(setId: string) {
    const vocabSet = mockVocabSets.at(+setId);
    // TODO
    this.title = vocabSet?.title || 'ERROR';
    this.set = vocabSet?.set || [];
  }
}
