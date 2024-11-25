export class Flashcard {
  frontText: string = '';
  backText: string = '';
}

export type FlashcardSet = Flashcard[];

export enum FlashcardMode {
  MAIN,
  STUDY,
}
