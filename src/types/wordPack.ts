export type PackType = "basic" | "diacritics" | "test";

export interface WordPack {
  id: string;
  name: { pl: string; en: string; [key: string]: string };
  language: string;
  type: PackType;
  words: { word: string; file?: string }[];
}
