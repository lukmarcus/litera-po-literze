import type { Language } from "@types";
import { plWordPacks } from "./pl";
import { enWordPacks } from "./en";

export const wordPacksByLanguage = {
  pl: plWordPacks,
  en: enWordPacks,
} as const;

export function getWordPacksForLanguage(language: Language) {
  return wordPacksByLanguage[language];
}
