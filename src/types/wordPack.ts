export type PackType = "basic" | "diacritics" | "test";

export interface WordPack {
  id: string;
  name: string;
  type: PackType;
  words: { word: string; file?: string }[];
}
