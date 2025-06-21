export interface WordPack {
  id: string;
  name: string;
  words: { word: string; file?: string }[];
  description?: string;
}
