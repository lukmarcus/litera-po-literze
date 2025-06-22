import { WordPack } from "../../types/wordPack";
import { Language } from "../../types/language";

export interface MainMenuProps {
  wordPacks: WordPack[];
  language: Language;
  setLanguage: (lang: Language) => void;
  onSelectPack: (packs: WordPack[]) => void;
  initialView?: "main" | "levels" | "packs";
}
