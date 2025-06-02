/// <reference types="vite/client" />
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";
import { WordPack } from "../../types/wordPack";
import { getFileName } from "../../utils/getFileName";
import { asset } from "../../utils/asset";
import { PL03BSC } from "../../data/pl03Bsc";
import { PL03DCR } from "../../data/pl03Dcr";

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
  const inputRef = useRef<HTMLInputElement>(null);

  // Używaj dynamicznej listy słów z przekazanego packa
  const getRandomWord = useCallback(() => {
    const words = wordPack.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, [wordPack.words]);

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

    // Poprawka: znajdź właściwe id paczki dla danego słowa
    const packId = findPackIdForWord(newWord);
    const audioPath = asset(
      `/audio/words/${packId}/${getFileName(newWord, "mp3")}`
    );

    console.log("Loading audio from:", audioPath);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

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

  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      handleNextWord();
      hasInitializedRef.current = true;
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.isComplete) {
        if (e.key === "Enter") {
          handleNextWord();
        }
        return;
      }

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
              new Audio(asset("/audio/effects/success.mp3"))
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
          new Audio(asset("/audio/effects/error.mp3"))
            .play()
            .catch(console.error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, handleNextWord]);

  useEffect(() => {
    if (!gameState.isComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.isComplete, gameState.activeIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const key = value[value.length - 1].toLowerCase();
    if (/^[a-ząćęłńóśźż]$/i.test(key)) {
      if (gameState.isComplete) return;
      const currentLetter =
        gameState.currentWord[gameState.activeIndex]?.toLowerCase();
      if (key === currentLetter) {
        const newInput = [...gameState.userInput];
        newInput[gameState.activeIndex] = key;
        setGameState((prev) => {
          const isComplete = prev.activeIndex + 1 === prev.currentWord.length;
          if (isComplete) {
            new Audio(asset("/audio/effects/success.mp3"))
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
        new Audio(asset("/audio/effects/error.mp3"))
          .play()
          .catch(console.error);
      }
    }
    e.target.value = "";
  };

  // Funkcja pomocnicza: znajdź id paczki dla danego słowa
  const findPackIdForWord = (word: string): string => {
    if (PL03BSC.includes(word)) return "pl03Bsc";
    if (PL03DCR.includes(word)) return "pl03Dcr";
    // Fallback: pierwszy fragment id
    return wordPack.id.split("-")[0];
  };

  const playAudio = () => {
    const packId = findPackIdForWord(gameState.currentWord);
    const audioPath = asset(
      `/audio/words/${packId}/${getFileName(gameState.currentWord, "mp3")}`
    );
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const audioFile = new Audio(audioPath);
    audioFile.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setAudio(audioFile);
  };

  return (
    <div className="game-container" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        className="hidden-mobile-input"
        onChange={handleInputChange}
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          left: "-9999px",
          height: 0,
          width: 0,
          zIndex: -1,
        }}
      />
      <div className="word-display">
        <img
          src={asset(
            `/images/words/${findPackIdForWord(
              gameState.currentWord
            )}/${getFileName(gameState.currentWord, "png")}`
          )}
          alt={gameState.currentWord}
          className="word-image"
          onError={(e) => {
            console.log("Image load error, using placeholder");
            console.log("Attempted to load:", e.currentTarget.src);
            const target = e.target as HTMLImageElement;
            target.src = asset("/images/words/placeholder.png");
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

        {gameState.isComplete ? (
          <div className="success-message">
            <h2>Brawo!</h2>
            <button onClick={handleNextWord} className="next-button">
              Następne słowo (Enter)
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Game;
