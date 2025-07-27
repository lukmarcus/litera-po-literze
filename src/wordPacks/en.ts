import { WordPack } from "../types/wordPack";
import { EN02 } from "../data/en02";
import { EN99 } from "../data/en99";

export const enWordPacks: WordPack[] = [
  {
    id: "en02",
    name: { en: "English 2-letter words", pl: "Angielskie 2-literowe słowa" },
    language: "en",
    type: "basic",
    words: EN02.map(({ en }) => ({ word: en })),
  },
  {
    id: "en99",
    name: { en: "English basic pack", pl: "Angielski pakiet podstawowy" },
    language: "en",
    type: "basic",
    words: EN99.map(({ en }) => ({ word: en })),
  },
];
