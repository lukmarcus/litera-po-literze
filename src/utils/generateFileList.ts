import { PL03BSC as basicWords } from "../data/pl03Bsc";
import { PL03DCR as difficultWords } from "../data/pl03Dcr";
import { getFileName } from "./getFileName";

export const generateFileList = () => {
  const allWords = [...basicWords, ...difficultWords];
  const uniqueWords = Array.from(new Set(allWords));

  console.log("Required files:");
  console.log("\nImages (public/images/):");
  uniqueWords.forEach((word) => {
    console.log(`- ${getFileName(word, "png")}`);
  });
  console.log("\nAudio files (public/audio/):");
  uniqueWords.forEach((word) => {
    console.log(`- ${getFileName(word, "mp3")}`);
  });
  console.log("\nUtility files:");
  console.log("- public/images/placeholder.jpg");
  console.log("- public/audio/error.mp3");
  console.log("- public/audio/success.mp3");

  console.log(`\nTotal unique words: ${uniqueWords.length}`);
  console.log(`Total required files: ${uniqueWords.length * 2 + 3}`);
};
