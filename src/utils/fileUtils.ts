export const getFileName = (word: string, extension: string): string => {
  // Normalize the word by removing diacritics and converting to lowercase
  const normalized = word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return `${normalized}.${extension}`;
};
