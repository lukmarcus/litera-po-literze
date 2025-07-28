export type PackLanguage = "pl" | "en" | "test";

export type Language = "pl" | "en";

export type PackType = "basic" | "diacritics" | "test";

export interface WordPack {
  id: string;
  name: { pl: string; en: string; [key: string]: string };
  language: string;
  type: PackType;
  words: { word: string; file?: string }[];
}

export interface AppProps {
  initialAppLang: Language;
  initialPackLang: PackLanguage;
  setLanguagesToHash: (appLang: Language, packLang: PackLanguage) => void;
}

export interface MainMenuProps {
  wordPacks: WordPack[];
  language: Language;
  setLanguage: (lang: Language) => void;
  setPackLanguage: (lang: PackLanguage) => void;
  packLanguage: PackLanguage;
  onSelectPack: (packs: WordPack[]) => void;
  initialView?: "main" | "levels" | "packs";
}

export interface PackMenuSectionProps {
  wordPacks: WordPack[];
  checked: boolean[];
  setChecked: (arr: boolean[]) => void;
  onSelectPack: (packs: WordPack[]) => void;
  translations: any;
  language: Language;
  onBack: () => void;
}

export interface LanguageButtonProps {
  label: string;
  iconSrc?: string;
  active: boolean;
  onClick: () => void;
}

export interface LanguageMenuSectionProps {
  appLanguage: Language;
  packLanguage: PackLanguage;
  setAppLanguage: (lang: Language) => void;
  setPackLanguage: (lang: PackLanguage) => void;
  translations: any;
}

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

export interface FooterProps {
  language: Language;
  onReportClick: () => void;
}

export interface BugReportModalProps {
  language: Language;
  onClose: () => void;
}

export interface BackToMenuModalProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
