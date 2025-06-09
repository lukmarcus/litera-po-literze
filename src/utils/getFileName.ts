export const getFileName = (word: string, extension: "mp3" | "png"): string => {
  return (
    word
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l")
      .replace(/ś/g, "s")
      .replace(/ź/g, "z")
      .replace(/ż/g, "z")
      .replace(/[^a-z0-9]/g, "") + `.${extension}`
  );
};
