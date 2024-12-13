import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlashcardSet, mockVocabSets } from '@models/flashcard';

@Component({
  selector: 'app-vocab',
  standalone: true,
  imports: [NgClass, RouterModule],
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

  private _id!: number;
  @Input()
  public set id(setId: string) {
    this._id = +setId;
    const vocabSet = mockVocabSets.at(+setId);
    // TODO
    this.title = vocabSet?.title || 'ERROR';
    this.set = vocabSet?.set || [];
  }
  public get id(): number {
    return this._id;
  }
}
