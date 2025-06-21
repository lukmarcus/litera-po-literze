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
  onBackToMenu: () => void;
  onChangePacks?: () => void;
}
