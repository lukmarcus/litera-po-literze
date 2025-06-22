import { WordPack } from "../types/wordPack";
import { TESTASD } from "../data/testASD";
import { TESTQWE } from "../data/testQWE";

export const testWordPacks: WordPack[] = [
  {
    id: "testASD",
    name: "3×1 testing letter (ASD)",
    type: "test",
    words: TESTASD,
  },
  {
    id: "testQWE",
    name: "3×1 testing letter (QWE)",
    type: "test",
    words: TESTQWE,
  },
];
