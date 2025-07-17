import React, { useState, useEffect } from "react";
import { MainMenuProps } from "./types";
import { translations } from "../../translations";
import "./mainMenu.css";

interface MainMenuPropsExt extends MainMenuProps {
  setPackLanguage: (lang: string) => void;
  packLanguage: string;
}

const MainMenu: React.FC<MainMenuPropsExt> = ({
  wordPacks,
  language,
  setLanguage,
  setPackLanguage,
  packLanguage,
  onSelectPack,
  initialView,
}) => {
  const [view, setView] = useState<
    "main" | "levels" | "packs" | "language" | "packLanguage"
  >(initialView || "main");
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
    { id: "basic", label: translations[language].basic },
    { id: "mixed", label: translations[language].mixed },
    { id: "diacritical", label: translations[language].diacritical },
  ]);

  const filteredWordPacks = wordPacks.filter(
    (pack) => pack.language === packLanguage
  );

  useEffect(() => {
    setLevelDifficulties([
      { id: "basic", label: translations[language].basic },
      { id: "mixed", label: translations[language].mixed },
      { id: "diacritical", label: translations[language].diacritical },
    ]);
  }, [language]);

  useEffect(() => {
    setChecked(filteredWordPacks.map(() => true));
  }, [packLanguage, filteredWordPacks.length]);

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
            🧠 {translations[language].levels}
          </button>
          <button
            className="menu-button green"
            onClick={() => setView("packs")}
          >
            📦 {translations[language].packs}
          </button>
          <button
            className="menu-button orange"
            onClick={() => alert("Opcja jeszcze niedostępna")}
          >
            ❓ {translations[language].howToPlay}
          </button>
          <button
            className="menu-button blue"
            onClick={() => setView("language")}
          >
            🌐 {translations[language].changeLanguage}
          </button>
          <button
            className="menu-button purple"
            onClick={() => setView("packLanguage")}
          >
            🌍 {translations[language].changePackLanguage || "Język paczek"}
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
            {translations[language].back}
          </button>
        </div>
      )}
      {view === "packs" && (
        <div className="menu-buttons" style={{ alignItems: "stretch" }}>
          <h2>{translations[language].selectPacks}</h2>
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
              const selected = filteredWordPacks.filter((_, i) => checked[i]);
              if (selected.length > 0) {
                onSelectPack(selected);
              } else {
                alert(
                  translations[language].selectAtLeastOnePack ||
                    "Wybierz przynajmniej jedną paczkę"
                );
              }
            }}
          >
            {filteredWordPacks.length === 0 ? (
              <div
                style={{ color: "red", fontWeight: "bold", margin: "1em 0" }}
              >
                {translations[language].noPacksForLanguage ||
                  "Brak paczek dla wybranego języka."}
              </div>
            ) : (
              filteredWordPacks.map((pack, idx) => (
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
              ))
            )}
            <button
              className="menu-button green"
              type="submit"
              disabled={
                filteredWordPacks.length === 0 || checked.every((v) => !v)
              }
              style={{ marginTop: "1.5rem" }}
            >
              {translations[language].play}
            </button>
          </form>
          <button
            className="menu-button"
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            {translations[language].back}
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
            className="menu-button"
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            {translations[language].back}
          </button>
        </div>
      )}
      {view === "packLanguage" && (
        <div className="menu-buttons">
          <button
            className={`menu-button${
              packLanguage === "pl" ? " lang-active" : ""
            }`}
            onClick={() => {
              setPackLanguage("pl");
              setView("main");
            }}
          >
            polski
          </button>
          <button
            className={`menu-button${
              packLanguage === "en" ? " lang-active" : ""
            }`}
            onClick={() => {
              setPackLanguage("en");
              setView("main");
            }}
          >
            English
          </button>
          <button
            className={`menu-button${
              packLanguage === "testpack" ? " lang-active" : ""
            }`}
            onClick={() => {
              setPackLanguage("testpack");
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
            {translations[language].back}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
