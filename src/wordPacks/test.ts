import { WordPack } from "../types/wordPack";
import { TESTASD } from "../data/testASD";
import { TESTQWE } from "../data/testQWE";

export const testWordPacks: WordPack[] = [
  {
    id: "testASD",
    name: { en: "3×1 testing letter (ASD)", pl: "3×1 testowe litery (ASD)" },
    language: "test",
    type: "test",
    words: TESTASD,
  },
  {
    id: "testQWE",
    name: { en: "3×1 testing letter (QWE)", pl: "3×1 testowe litery (QWE)" },
    language: "test",
    type: "test",
    words: TESTQWE,
  },
];
