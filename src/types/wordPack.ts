export type PackType = "basic" | "diacritics" | "test";

export interface WordPack {
  id: string;
  name: string;
  language: string;
  type: PackType;
  words: { word: string; file?: string }[];
}
