import { WordPack } from "../types/wordPack";
import { PL03BSC } from "../data/pl03Bsc";
import { PL03DCR } from "../data/pl03Dcr";

export const plWordPacks: WordPack[] = [
  {
    id: "pl03Bsc",
    name: {
      pl: "3 litery bez polskich znaków",
      en: "3 letters without Polish characters",
    },
    language: "pl",
    type: "basic",
    words: PL03BSC,
  },
  {
    id: "pl03Dcr",
    name: {
      pl: "3 litery z polskimi znakami",
      en: "3 letters with Polish characters",
    },
    language: "pl",
    type: "diacritics",
    words: PL03DCR,
  },
];
