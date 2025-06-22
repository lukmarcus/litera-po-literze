import { WordPack } from "../types/wordPack";
import { EN99 } from "../data/en99";

export const enWordPacks: WordPack[] = [
  {
    id: "en99",
    name: "English basic pack",
    type: "basic",
    words: EN99.map(({ en }) => ({ word: en })),
  },
];
