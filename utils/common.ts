export const LetterOptions = [
  "a-letter",
  "b-letter",
  "c-letter",
  "d-letter",
  "e-letter",
  "f-letter",
  "g-letter",
  "h-letter",
  "i-letter",
  "j-letter",
  "k-letter",
  "l-letter",
  "m-letter",
  "n-letter",
  "o-letter",
  "p-letter",
  "q-letter",
  "r-letter",
  "s-letter",
  "t-letter",
  "u-letter",
  "v-letter",
  "w-letter",
  "x-letter",
  "y-letter",
  "z-letter"
];


export type VocabType = "word" | "idiom" | "foreign" | "one word"

export type VocabItem = {
  type: VocabType
  word?: string;
  idiom?: string;
  meaning?: string;
  "meaning (hindi)"?: string;
  synonyms?: string;
  sentences?: string;
};

