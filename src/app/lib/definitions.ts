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

export enum QualityOfAwnserRetrieval {
  Recalled = 5,
  Recalled_With_Hesitation = 4,
  Recalled_With_Difficulty = 3,
  Forgot_Recalled_On_Awnser = 2,
  Forgot = 1,
  Dont_Know = 0,
}