import React, { useState, useEffect, useCallback, useRef } from "react";
import { PL_03_BSC } from "../data/pl-03-bsc";
import { PL_03_DCR } from "../data/pl-03-dcr";
import { getFileName } from "../utils/file-utils";
import "./game.css";
import { WordPack } from "../types/word-pack";

interface GameState {
  currentWord: string;
  userInput: string[];
  activeIndex: number;
  isComplete: boolean;
  showError: boolean;
}

interface GameProps {
  wordPack: WordPack;
  onBackToMenu: () => void;
}

const Game: React.FC<GameProps> = ({ wordPack, onBackToMenu }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: "",
    userInput: [],
    activeIndex: 0,
    isComplete: false,
    showError: false,
  });

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomWord = useCallback(() => {
    const words = wordPack.id === "pl-03-bsc" ? PL_03_BSC : PL_03_DCR;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, [wordPack.id]);

  const initializeGame = useCallback(() => {
    const newWord = getRandomWord();
    console.log("Initializing game with word:", newWord);

    setGameState({
      currentWord: newWord,
      userInput: Array(newWord.length).fill(""),
      activeIndex: 0,
      isComplete: false,
      showError: false,
    });

    // Load and play audio
    const audioPath = `/audio/words/${wordPack.id}/${getFileName(
      newWord,
      "mp3"
    )}`;
    console.log("Loading audio from:", audioPath);
    const audioFile = new Audio(audioPath);
    audioFile.oncanplaythrough = () => {
      console.log("Audio loaded, playing...");
      audioFile.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    };
    audioFile.onerror = (e) => {
      console.error("Error loading audio:", e);
    };
    setAudio(audioFile);
  }, [getRandomWord, wordPack.id]);

  const handleNextWord = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    const handleNextWordEffect = () => {
      handleNextWord();
    };
    handleNextWordEffect();
  }, [handleNextWord]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.isComplete) {
        if (e.key === "Enter") {
          handleNextWord();
        }
        return;
      }

      // Allow Polish characters and regular letters
      if (/^[a-ząćęłńóśźż]$/i.test(e.key)) {
        e.preventDefault();
        const key = e.key.toLowerCase();
        const currentLetter =
          gameState.currentWord[gameState.activeIndex].toLowerCase();

        if (key === currentLetter) {
          const newInput = [...gameState.userInput];
          newInput[gameState.activeIndex] = key;

          setGameState((prev) => {
            const isComplete = prev.activeIndex + 1 === prev.currentWord.length;
            if (isComplete) {
              new Audio("/audio/effects/success.mp3")
                .play()
                .catch(console.error);
            }
            return {
              ...prev,
              userInput: newInput,
              activeIndex: prev.activeIndex + 1,
              isComplete,
              showError: false,
            };
          });
        } else {
          setGameState((prev) => ({ ...prev, showError: true }));
          new Audio("/audio/effects/error.mp3").play().catch(console.error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, handleNextWord]);

  const playAudio = () => {
    if (audio) {
      console.log("Playing audio");
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      console.log("No audio available");
    }
  };

  return (
    <div className="game-container" ref={containerRef}>
      <div className="word-display">
        <img
          src={`/images/words/${wordPack.id}/${getFileName(
            gameState.currentWord,
            "png"
          )}`}
          alt={gameState.currentWord}
          className="word-image"
          onError={(e) => {
            console.log("Image load error, using placeholder");
            console.log("Attempted to load:", e.currentTarget.src);
            const target = e.target as HTMLImageElement;
            target.src = "/images/words/placeholder.png";
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", gameState.currentWord);
          }}
        />

        {/* Debug: Show current word */}
        <div className="debug-word">Current word: {gameState.currentWord}</div>

        <button onClick={playAudio} className="audio-button">
          🔊
        </button>

        <div className="letter-slots">
          {gameState.userInput.map((letter, index) => (
            <div
              key={index}
              className={`letter-slot ${
                index === gameState.activeIndex ? "active" : ""
              } ${
                gameState.showError && index === gameState.activeIndex
                  ? "error"
                  : ""
              }`}
            >
              {letter}
            </div>
          ))}
        </div>

        {gameState.isComplete && (
          <div className="success-message">
            <h2>Brawo!</h2>
            <button onClick={handleNextWord} className="next-button">
              Następne słowo (Enter)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
