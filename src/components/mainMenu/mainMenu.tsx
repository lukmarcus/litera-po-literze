import React, { useState, useEffect } from "react";
import { MainMenuProps } from "./types";
import "./mainMenu.css";

const TRANSLATIONS = {
  pl: {
    levels: "Poziomy",
    packs: "Paczki",
    howToPlay: "Jak grać?",
    changeLanguage: "Zmień język",
    basic: "Podstawowe",
    mixed: "Mieszane",
    diacritical: "Diakrytyczne",
    back: "← Powrót",
    selectPacks: "Wybierz zestawy słów",
    play: "Zagraj",
  },
  en: {
    levels: "Levels",
    packs: "Packs",
    howToPlay: "How to play?",
    changeLanguage: "Change language",
    basic: "Basic",
    mixed: "Mixed",
    diacritical: "Diacritical",
    back: "← Back",
    selectPacks: "Select word packs",
    play: "Play",
  },
  test: {
    levels: "Levels",
    packs: "Packs",
    howToPlay: "How to play?",
    changeLanguage: "Change language",
    basic: "Basic",
    mixed: "Mixed",
    diacritical: "Diacritical",
    back: "← Back",
    selectPacks: "Select word packs",
    play: "Play",
  },
};

const MainMenu: React.FC<MainMenuProps> = ({
  wordPacks,
  language,
  setLanguage,
  onSelectPack,
  initialView,
}) => {
  const [view, setView] = useState<"main" | "levels" | "packs" | "language">(
    initialView || "main"
  );
  const [checked, setChecked] = useState<boolean[]>(() => {
    const saved = localStorage.getItem("lastChecked");
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr.length === wordPacks.length) return arr;
      } catch {}
    }
    return wordPacks.map(() => true);
  });
  const [levelDifficulties, setLevelDifficulties] = useState([
    { id: "basic", label: TRANSLATIONS[language].basic },
    { id: "mixed", label: TRANSLATIONS[language].mixed },
    { id: "diacritical", label: TRANSLATIONS[language].diacritical },
  ]);

  useEffect(() => {
    setLevelDifficulties([
      { id: "basic", label: TRANSLATIONS[language].basic },
      { id: "mixed", label: TRANSLATIONS[language].mixed },
      { id: "diacritical", label: TRANSLATIONS[language].diacritical },
    ]);
  }, [language]);

  useEffect(() => {
    setChecked(wordPacks.map(() => true));
  }, [language, wordPacks.length]);

  const handleLevelDifficulty = (difficulty: string) => {
    alert(`Wybrano poziomy, trudność: ${difficulty}`);
  };

  return (
    <div className="main-menu-page">
      {view === "main" && (
        <div className="menu-buttons">
          <button
            className="menu-button yellow"
            onClick={() => setView("levels")}
          >
            🧠 {TRANSLATIONS[language].levels}
          </button>
          <button
            className="menu-button green"
            onClick={() => setView("packs")}
          >
            📦 {TRANSLATIONS[language].packs}
          </button>
          <button
            className="menu-button orange"
            onClick={() => alert("Opcja jeszcze niedostępna")}
          >
            ❓ {TRANSLATIONS[language].howToPlay}
          </button>
          <button
            className="menu-button blue"
            onClick={() => setView("language")}
          >
            🌐 {TRANSLATIONS[language].changeLanguage}
          </button>
        </div>
      )}

      {view === "levels" && (
        <div className="menu-buttons">
          {levelDifficulties.map((diff) => (
            <button
              key={diff.id}
              className="menu-button blue"
              onClick={() => handleLevelDifficulty(diff.id)}
            >
              {diff.label}
            </button>
          ))}
          <button
            className="menu-button"
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            {TRANSLATIONS[language].back}
          </button>
        </div>
      )}

      {view === "packs" && (
        <div className="menu-buttons" style={{ alignItems: "stretch" }}>
          <h2>{TRANSLATIONS[language].selectPacks}</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem("lastChecked", JSON.stringify(checked));
              const selected = wordPacks.filter((_, i) => checked[i]);
              if (selected.length > 0) onSelectPack(selected);
            }}
          >
            {wordPacks.map((pack, idx) => (
              <label
                key={pack.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75em",
                  background: "#e6ffe6",
                  borderRadius: 8,
                  padding: "0.5em 1em",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked[idx]}
                  onChange={() => {
                    const arr = [...checked];
                    arr[idx] = !arr[idx];
                    setChecked(arr);
                  }}
                  style={{ marginTop: 4 }}
                />
                {pack.name}
              </label>
            ))}
            <button
              className="menu-button green"
              type="submit"
              disabled={checked.every((v) => !v)}
              style={{ marginTop: "1.5rem" }}
            >
              {TRANSLATIONS[language].play}
            </button>
          </form>
          <button
            className="menu-button"
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            {TRANSLATIONS[language].back}
          </button>
        </div>
      )}

      {view === "language" && (
        <div className="menu-buttons">
          <button
            className={`menu-button${language === "pl" ? " lang-active" : ""}`}
            onClick={() => {
              setLanguage("pl");
              setView("main");
            }}
          >
            polski
          </button>
          <button
            className={`menu-button${language === "en" ? " lang-active" : ""}`}
            onClick={() => {
              setLanguage("en");
              setView("main");
            }}
          >
            English
          </button>
          <button
            className={`menu-button${
              language === "test" ? " lang-active" : ""
            }`}
            onClick={() => {
              setLanguage("test");
              setView("main");
            }}
          >
            Test
          </button>
          <button
            className="menu-button"
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            {TRANSLATIONS[language].back}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
