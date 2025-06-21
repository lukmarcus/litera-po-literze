import { WordPack } from "../../types/wordPack";

export interface MainMenuProps {
  wordPacks: WordPack[];
  language: "pl" | "en" | "test";
  setLanguage: (lang: "pl" | "en" | "test") => void;
  onSelectPack: (packs: WordPack[]) => void;
  initialView?: "main" | "levels" | "packs";
}
