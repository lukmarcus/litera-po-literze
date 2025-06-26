import { Language } from "../../types/language";
import { WordPack } from "../../types/wordPack";

export interface GameState {
  currentWord: string;
  userInput: string[];
  activeIndex: number;
  isComplete: boolean;
  showError: boolean;
  currentWordObj?: { word: string; file?: string };
}

export interface GameProps {
  wordPack: WordPack;
  language: Language;
  onBackToMenu: () => void;
  onChangePacks?: () => void;
}
