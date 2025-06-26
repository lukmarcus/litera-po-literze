import { Language } from "../types/language";
import { plWordPacks } from "./pl";
import { enWordPacks } from "./en";
import { testWordPacks } from "./test";

export const wordPacksByLanguage = {
  pl: plWordPacks,
  en: enWordPacks,
  test: testWordPacks,
} as const;

export function getWordPacksForLanguage(language: Language) {
  return wordPacksByLanguage[language];
}
