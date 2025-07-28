import "./mainMenu.css";
import type { MainMenuProps } from "@types";
import React, { useState, useEffect } from "react";
import { translations } from "@translations";
import LanguageMenuSection from "./languageMenuSection";
import PackMenuSection from "./packMenuSection";

const MainMenu: React.FC<MainMenuProps> = ({
  wordPacks,
  language,
  setLanguage,
  setPackLanguage,
  packLanguage,
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
    alert(`${translations[language].levelSelected} ${difficulty}`);
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
            onClick={() => alert(translations[language].featureUnavailable)}
          >
            ❓ {translations[language].howToPlay}
          </button>
          <button
            className="menu-button blue"
            onClick={() => setView("language")}
          >
            🛠️ {translations[language].changeLanguage}
          </button>
        </div>
      )}
      {view === "levels" && (
        <div className="menu-buttons">
          <h2>{translations[language].selectLevel}</h2>
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
        <PackMenuSection
          wordPacks={filteredWordPacks}
          checked={checked}
          setChecked={setChecked}
          onSelectPack={onSelectPack}
          translations={translations[language]}
          language={language}
          onBack={() => setView("main")}
        />
      )}
      {view === "language" && (
        <div className="menu-buttons" style={{ width: "100%" }}>
          <LanguageMenuSection
            appLanguage={language}
            packLanguage={packLanguage}
            setAppLanguage={setLanguage}
            setPackLanguage={setPackLanguage}
            translations={translations[language]}
          />
          <button className="menu-button" onClick={() => setView("main")}>
            {translations[language].back}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
