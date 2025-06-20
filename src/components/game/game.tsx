/// <reference types="vite/client" />
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";
import { WordPack } from "../../types/wordPack";
import { getFileName } from "../../utils/getFileName";
import { asset } from "../../utils/asset";
import { PL03BSC } from "../../data/pl03Bsc";
import { PL03DCR } from "../../data/pl03Dcr";
import BackToMenuModal from "../backToMenuModal/backToMenuModal";

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
  onChangePacks?: () => void;
}

const Game: React.FC<GameProps> = ({
  wordPack,
  onBackToMenu,
  onChangePacks,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: "",
    userInput: [],
    activeIndex: 0,
    isComplete: false,
    showError: false,
  });

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [allDone, setAllDone] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (wordPack.words.length === 0) {
      setAllDone(true);
      setGameState({
        currentWord: "",
        userInput: [],
        activeIndex: 0,
        isComplete: false,
        showError: false,
      });
      setRemainingWords([]);
      return;
    }
    const randomIndex = Math.floor(Math.random() * wordPack.words.length);
    const firstWord = wordPack.words[randomIndex];
    setGameState({
      currentWord: firstWord,
      userInput: Array(firstWord.length).fill(""),
      activeIndex: 0,
      isComplete: false,
      showError: false,
    });
    setRemainingWords(wordPack.words.filter((w, i) => i !== randomIndex));
    setAllDone(false);
    hasInitializedRef.current = false;
    // eslint-disable-next-line
  }, [wordPack]);

  useEffect(() => {
    if (!gameState.currentWord) return;
    const packId = findPackIdForWord(gameState.currentWord);
    const audioPath = asset(
      `/audio/words/${packId}/${getFileName(gameState.currentWord, "mp3")}`
    );
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.oncanplaythrough = null;
      audio.onerror = null;
    }
    const audioFile = new Audio(audioPath);
    audioFile.oncanplaythrough = () => {
      audioFile.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    };
    audioFile.onerror = (e) => {
      console.error("Error loading audio:", e);
    };
    setAudio(audioFile);
  }, [gameState.currentWord]);

  const handleNextWord = useCallback(() => {
    if (remainingWords.length === 0) {
      setAllDone(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const nextWord = remainingWords[randomIndex];
    setGameState({
      currentWord: nextWord,
      userInput: Array(nextWord.length).fill(""),
      activeIndex: 0,
      isComplete: false,
      showError: false,
    });
    setRemainingWords((prev) => prev.filter((w, i) => i !== randomIndex));
  }, [remainingWords]);

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

  const findPackIdForWord = (word: string): string => {
    if (PL03BSC.includes(word)) return "pl03Bsc";
    if (PL03DCR.includes(word)) return "pl03Dcr";
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
      <button
        className="back-button"
        style={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}
        onClick={() => {
          if (!allDone) {
            setShowConfirmModal(true);
            return;
          }
          onBackToMenu();
        }}
        aria-label="Wróć do menu"
      >
        ← Menu
      </button>
      <BackToMenuModal
        open={showConfirmModal}
        title="Czy na pewno chcesz wrócić do menu?"
        message="Postęp w tej grze zostanie utracony."
        confirmLabel="Tak, wróć do menu"
        cancelLabel="Anuluj"
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          onBackToMenu();
        }}
      />
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
        {allDone ? (
          <div className="success-message">
            <h2>Gratulacje! Ukończono wszystkie słowa.</h2>
            <button
              className="next-button"
              onClick={() => {
                setRemainingWords([...wordPack.words]);
                setAllDone(false);
              }}
            >
              Zagraj te same paczki
            </button>
            <button
              className="next-button"
              onClick={() => {
                if (onChangePacks) onChangePacks();
              }}
              style={{ marginLeft: 16 }}
            >
              Zmień paczki
            </button>
            <button
              className="next-button"
              onClick={onBackToMenu}
              style={{ marginLeft: 16 }}
            >
              Wróć do menu
            </button>
          </div>
        ) : (
          <>
            {gameState.currentWord && (
              <img
                src={asset(
                  `/images/words/${findPackIdForWord(
                    gameState.currentWord
                  )}/${getFileName(gameState.currentWord, "png")}`
                )}
                alt={gameState.currentWord}
                className="word-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = asset("/images/words/placeholder.png");
                }}
              />
            )}
            <div className="debug-word">
              Current word: {gameState.currentWord}
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
