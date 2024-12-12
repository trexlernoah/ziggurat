export class Flashcard {
  frontText: string = '';
  backText: string = '';

  constructor(front: string = '', back: string = '') {
    this.frontText = front;
    this.backText = back;
  }
}

export type FlashcardSet = Flashcard[];

export type VocabSets = {
  title: string;
  set: FlashcardSet;
}[];

export enum FlashcardMode {
  MAIN,
  STUDY,
}

export const emptyFlashcardSet: FlashcardSet = [
  { frontText: '', backText: '' },
  { frontText: '', backText: '' },
  { frontText: '', backText: '' },
  { frontText: '', backText: '' },
  { frontText: '', backText: '' },
];

export const mockFlashcardSet: FlashcardSet = [
  { frontText: 'hola', backText: 'hello' },
  { frontText: 'por favor', backText: 'please' },
  { frontText: 'gracias', backText: 'thank you' },
  { frontText: 'de nada', backText: "you're welcome" },
  { frontText: 'amigo', backText: 'friend' },
  { frontText: 'antes', backText: 'before' },
  { frontText: 'ahora', backText: 'now' },
  { frontText: 'despues', backText: 'later' },
  { frontText: 'me gusta', backText: 'I like' },
  { frontText: 'nunca', backText: 'never' },
  { frontText: 'mismo', backText: 'same' },
  { frontText: 'ir', backText: 'to go' },
];

export const mockVocabSets: VocabSets = [
  {
    title: 'Traveling',
    set: [
      { frontText: 'hola', backText: 'hello' },
      { frontText: 'por favor', backText: 'please' },
      { frontText: 'gracias', backText: 'thank you' },
    ],
  },
  {
    title: 'Foods',
    set: [
      { frontText: 'hola', backText: 'hello' },
      { frontText: 'por favor', backText: 'please' },
      { frontText: 'gracias', backText: 'thank you' },
    ],
  },
  {
    title: 'Animals',
    set: [
      { frontText: 'hola', backText: 'hello' },
      { frontText: 'por favor', backText: 'please' },
      { frontText: 'gracias', backText: 'thank you' },
    ],
  },
  {
    title: 'Unit Vocab 2',
    set: [
      { frontText: 'hola', backText: 'hello' },
      { frontText: 'por favor', backText: 'please' },
      { frontText: 'gracias', backText: 'thank you' },
    ],
  },
];
