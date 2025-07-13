export const SUPPORTED_LANGUAGES = ["pl", "en"] as const;

export type Language = "pl" | "en";

export const DEFAULT_LANGUAGE: Language = "en";

export function isSupportedLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

export function getLanguageFromHash(): Language {
  const hash = window.location.hash.slice(1);
  return isSupportedLanguage(hash) ? hash : DEFAULT_LANGUAGE;
}
