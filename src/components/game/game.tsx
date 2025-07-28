/// <reference types="vite/client" />
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";
import { asset } from "../../utils/asset";
import BackToMenuModal from "../backToMenuModal/backToMenuModal";
import type { GameState, GameProps } from "@types";
import { translations } from "@translations";

const Game: React.FC<GameProps> = ({
  wordPack,
  language,
  onBackToMenu,
  onChangePacks,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: "",
    userInput: [],
    activeIndex: 0,
    isComplete: false,
    showError: false,
    currentWordObj: undefined,
  });

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [remainingWords, setRemainingWords] = useState<
    { word: string; file?: string }[]
  >([]);
  const [allDone, setAllDone] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (
      Array.isArray(wordPack.words) &&
      wordPack.words.length > 0 &&
      typeof wordPack.words[0] === "object" &&
      "word" in wordPack.words[0]
    ) {
      const wordsArr = wordPack.words.filter(
        (w): w is { word: string; file?: string } =>
          typeof w === "object" && "word" in w
      );
      const randomIndex = Math.floor(Math.random() * wordsArr.length);
      const firstWordObj = wordsArr[randomIndex];
      setGameState({
        currentWord: firstWordObj.word,
        userInput: Array(firstWordObj.word.length).fill(""),
        activeIndex: 0,
        isComplete: false,
        showError: false,
        currentWordObj: firstWordObj,
      });
      setRemainingWords(wordsArr.filter((_, i) => i !== randomIndex));
      setAllDone(false);
      hasInitializedRef.current = false;
    } else {
      setAllDone(true);
      setGameState({
        currentWord: "",
        userInput: [],
        activeIndex: 0,
        isComplete: false,
        showError: false,
        currentWordObj: undefined,
      });
      setRemainingWords([]);
      return;
    }
  }, [wordPack]);
  useEffect(() => {
    if (!gameState.currentWordObj) return;
    const fileName =
      gameState.currentWordObj.file || gameState.currentWordObj.word;
    const audioPath = asset(
      `/audio/words/${wordPack.language}/${fileName}.mp3`
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
  }, [gameState.currentWordObj]);

  const handleNextWord = useCallback(() => {
    if (remainingWords.length === 0) {
      setAllDone(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const nextWordObj = remainingWords[randomIndex];
    setGameState({
      currentWord: nextWordObj.word,
      userInput: Array(nextWordObj.word.length).fill(""),
      activeIndex: 0,
      isComplete: false,
      showError: false,
      currentWordObj: nextWordObj,
    });
    setRemainingWords((prev) => prev.filter((_, i) => i !== randomIndex));
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
  const playAudio = () => {
    if (!gameState.currentWordObj) return;
    const fileName =
      gameState.currentWordObj.file || gameState.currentWordObj.word;
    const audioPath = asset(`/audio/words/${language}/${fileName}.mp3`);
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

  const getImageFileName = (wordObj: { word: string; file?: string }) => {
    return `${wordObj.file || wordObj.word}.png`;
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
        aria-label={translations[language].backToMenu}
      >
        {translations[language].backToMenu}
      </button>
      <BackToMenuModal
        open={showConfirmModal}
        title={translations[language].backToMenuTitle}
        message={translations[language].backToMenuMessage}
        confirmLabel={translations[language].backToMenuConfirm}
        cancelLabel={translations[language].cancel}
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
        {" "}
        {allDone ? (
          <div className="success-message">
            <h2>{translations[language].congratulations}</h2>
            <button
              className="next-button"
              onClick={() => {
                if (
                  Array.isArray(wordPack.words) &&
                  wordPack.words.length > 0 &&
                  typeof wordPack.words[0] === "object" &&
                  "word" in wordPack.words[0]
                ) {
                  const wordsArr = wordPack.words.filter(
                    (w): w is { word: string; file?: string } =>
                      typeof w === "object" && "word" in w
                  );
                  setRemainingWords(wordsArr);
                  setAllDone(false);
                }
              }}
            >
              {translations[language].playSamePacks}
            </button>
            <button
              className="next-button"
              onClick={() => {
                if (onChangePacks) onChangePacks();
              }}
              style={{ marginLeft: 16 }}
            >
              {translations[language].changePacks}
            </button>
            <button
              className="next-button"
              onClick={onBackToMenu}
              style={{ marginLeft: 16 }}
            >
              {translations[language].returnToMenu}
            </button>
          </div>
        ) : (
          <>
            {gameState.currentWord && gameState.currentWordObj && (
              <img
                src={asset(
                  `/images/words/${getImageFileName(gameState.currentWordObj)}`
                )}
                alt={gameState.currentWord}
                className="word-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = asset("/images/words/placeholder.png");
                }}
              />
            )}{" "}
            <div className="debug-word">
              {translations[language].currentWord} {gameState.currentWord}
            </div>
            <button onClick={playAudio} className="audio-button">
              🔊
            </button>
            {gameState.isComplete ? (
              <div className="success-message">
                <h2>{translations[language].wellDone}</h2>
                <button onClick={handleNextWord} className="next-button">
                  {translations[language].nextWord}
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
