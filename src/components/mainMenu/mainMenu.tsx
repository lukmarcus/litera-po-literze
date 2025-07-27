import React, { useState, useEffect } from "react";
import { MainMenuProps } from "./types";
import LanguageButton from "./LanguageButton";
import { translations } from "../../translations";
import { asset } from "../../utils/asset";
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
                alert(translations[language].selectAtLeastOnePack);
              }
            }}
          >
            {filteredWordPacks.length === 0 ? (
              <div
                style={{ color: "red", fontWeight: "bold", margin: "1em 0" }}
              >
                {translations[language].noPacksForLanguage}
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
                  {pack.name[language] || pack.name.en}
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
        <div className="menu-buttons" style={{ width: "100%" }}>
          <h2>{translations[language].changeLanguage}</h2>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
                {translations[language].changeAppLanguage}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <LanguageButton
                  label="PL"
                  iconSrc={asset("/images/languages/pl.svg")}
                  active={language === "pl"}
                  onClick={() => setLanguage("pl")}
                />
                <LanguageButton
                  label="EN"
                  iconSrc={asset("/images/languages/en.svg")}
                  active={language === "en"}
                  onClick={() => setLanguage("en")}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
                {translations[language].changePackLanguage}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <LanguageButton
                  label="PL"
                  iconSrc={asset("/images/languages/pl.svg")}
                  active={packLanguage === "pl"}
                  onClick={() => setPackLanguage("pl")}
                />
                <LanguageButton
                  label="EN"
                  iconSrc={asset("/images/languages/en.svg")}
                  active={packLanguage === "en"}
                  onClick={() => setPackLanguage("en")}
                />
                <LanguageButton
                  label="🧪 TEST"
                  active={packLanguage === "test"}
                  onClick={() => setPackLanguage("test")}
                />
              </div>
            </div>
          </div>
          <button className="menu-button" onClick={() => setView("main")}>
            {translations[language].back}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
