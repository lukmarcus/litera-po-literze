export interface WordPack {
  id: string;
  name: string;
  words: { pl: string; en: string }[];
  description?: string;
}
