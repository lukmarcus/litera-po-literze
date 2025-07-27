import type { WordPack } from "../../types/wordPack";
import type { Language } from "../../types/language";

export interface LanguageButtonProps {
  label: string;
  iconSrc?: string;
  active: boolean;
  onClick: () => void;
}

export interface LanguageMenuSectionProps {
  appLanguage: string;
  packLanguage: string;
  setAppLanguage: (lang: Language) => void;
  setPackLanguage: (lang: string) => void;
  translations: any;
}

export interface MainMenuProps {
  wordPacks: WordPack[];
  language: Language;
  setLanguage: (lang: Language) => void;
  onSelectPack: (packs: WordPack[]) => void;
  initialView?: "main" | "levels" | "packs";
}
