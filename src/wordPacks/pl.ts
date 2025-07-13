import { WordPack } from "../types/wordPack";
import { PL03BSC } from "../data/pl03Bsc";
import { PL03DCR } from "../data/pl03Dcr";

export const plWordPacks: WordPack[] = [
  {
    id: "pl03Bsc",
    name: "3 litery bez polskich znaków",
    language: "pl",
    type: "basic",
    words: PL03BSC,
  },
  {
    id: "pl03Dcr",
    name: "3 litery z polskimi znakami",
    language: "pl",
    type: "diacritics",
    words: PL03DCR,
  },
];
