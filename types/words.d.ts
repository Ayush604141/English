declare module "*/words.json" {
  interface VocabItem {
    type: "word" | "idiom" | "foreign" | "one word";
    word?: string;
    idiom?: string;
    meaning?: string;
    "meaning (hindi)"?: string;
    synonyms?: string;
    sentences?: string;
  }

  const value: VocabItem[];
  export default value;
}
