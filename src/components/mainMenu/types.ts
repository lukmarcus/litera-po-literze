import { WordPack } from "../../types/wordPack";

export interface MainMenuProps {
  wordPacks: WordPack[];
  onSelectPack: (packs: WordPack[]) => void;
  initialView?: "main" | "levels" | "packs";
}
