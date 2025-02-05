export class Flashcard {
  frontText: string = '';
  backText: string = '';

  constructor(front: string = '', back: string = '') {
    this.frontText = front;
    this.backText = back;
  }
}

export type FlashcardSet = {
  title: string;
  cards: Flashcard[];
};

export type FlashcardCollection = { [key: string]: FlashcardSet };

export const emptyFlashcardSet: FlashcardSet = {
  title: 'New Flashcard Set',
  cards: [
    { frontText: '', backText: '' },
    { frontText: '', backText: '' },
    { frontText: '', backText: '' },
    { frontText: '', backText: '' },
    { frontText: '', backText: '' },
  ],
};
