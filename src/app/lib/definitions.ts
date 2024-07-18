export type Word = {
  id: number;
  native: string;
  translation: string;
};

export enum Awnser {
  Pending,
  Correct,
  Incorrect,
}