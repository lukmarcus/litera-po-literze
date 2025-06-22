import { Language } from "../../types/language";

export interface GameState {
  currentWord: string;
  userInput: string[];
  activeIndex: number;
  isComplete: boolean;
  showError: boolean;
  currentWordObj?: { word: string; file?: string };
}

export interface GameProps {
  wordPack: import("../../types/wordPack").WordPack;
  language: Language;
  onBackToMenu: () => void;
  onChangePacks?: () => void;
}
