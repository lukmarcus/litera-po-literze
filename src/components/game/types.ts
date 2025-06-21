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
  language: "pl" | "en" | "test";
  onBackToMenu: () => void;
  onChangePacks?: () => void;
}
