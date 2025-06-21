export interface GameState {
  currentWord: string;
  userInput: string[];
  activeIndex: number;
  isComplete: boolean;
  showError: boolean;
  currentWordObj?: { pl: string; en: string };
}

export interface GameProps {
  wordPack: import("../../types/wordPack").WordPack;
  onBackToMenu: () => void;
  onChangePacks?: () => void;
}
