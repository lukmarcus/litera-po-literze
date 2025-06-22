import { Language } from "../types/language";
import { pl } from "./pl";
import { en } from "./en";
import { test } from "./test";

export const translations = {
  pl,
  en,
  test,
} as const;

export type TranslationKey = keyof typeof translations.pl;
