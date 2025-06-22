/// <reference types="vite/client" />
import React, { useState, useEffect } from "react";
import Game from "./components/game/game";
import MainMenu from "./components/mainMenu/mainMenu";
import { WordPack } from "./types/wordPack";
import {
  Language,
  getLanguageFromHash,
  DEFAULT_LANGUAGE,
} from "./types/language";
import { PL03BSC } from "./data/pl03Bsc";
import { PL03DCR } from "./data/pl03Dcr";
import { TESTASD } from "./data/testASD";
import { TESTQWE } from "./data/testQWE";
import { EN99 } from "./data/en99";
import Footer from "./components/footer/footer";
import BugReportModal from "./components/bugReportModal/bugReportModal";
import "./app.css";
import { asset } from "./utils/asset";
import { translations } from "./translations";

const App: React.FC = () => {
  const [selectedPacks, setSelectedPacks] = useState<WordPack[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPacksView, setShowPacksView] = useState(false);
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  const updateHash = (newLanguage: Language) => {
    window.location.hash = newLanguage;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const langFromHash = getLanguageFromHash();
      setLanguage(langFromHash);
    };

    const initialLang = getLanguageFromHash();
    setLanguage(initialLang);

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    updateHash(newLanguage);
    setLanguage(newLanguage);
  };

  const handleChangePacks = () => {
    setSelectedPacks(null);
    setShowPacksView(true);
  };

  let wordPacks: WordPack[] = [];
  if (language === "pl") {
    wordPacks = [
      {
        id: "pl03Bsc",
        name: "3 litery bez polskich znaków",
        words: PL03BSC,
      },
      {
        id: "pl03Dcr",
        name: "3 litery z polskimi znakami",
        words: PL03DCR,
      },
    ];
  } else if (language === "en") {
    wordPacks = [
      {
        id: "en99",
        name: "English basic pack",
        words: EN99.map(({ en }) => ({ word: en })),
      },
    ];
  } else if (language === "test") {
    wordPacks = [
      {
        id: "testASD",
        name: "3×1 testing letter (ASD)",
        words: TESTASD,
      },
      {
        id: "testQWE",
        name: "3×1 testing letter (QWE)",
        words: TESTQWE,
      },
    ];
  }

  const mergedPack: WordPack | null = selectedPacks
    ? {
        id: selectedPacks.map((p) => p.id).join("-"),
        name: selectedPacks.map((p) => p.name).join(", "),
        words: selectedPacks.flatMap((p) => p.words),
      }
    : null;

  return (
    <div className="app">
      <header
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="logo">
          <img src={asset("/icon.svg")} alt="Logo" className="logo-icon" />
          <div>
            <h1>{translations[language].title}</h1>
            <p>{translations[language].subtitle}</p>
          </div>
        </div>
      </header>

      <main>
        {mergedPack ? (
          <Game
            wordPack={mergedPack}
            language={language}
            onBackToMenu={() => {
              setSelectedPacks(null);
              setShowPacksView(false);
            }}
            onChangePacks={handleChangePacks}
          />
        ) : (
          <MainMenu
            wordPacks={wordPacks}
            language={language}
            setLanguage={handleLanguageChange}
            onSelectPack={(packs) => {
              setSelectedPacks(packs);
              setShowPacksView(false);
            }}
            initialView={showPacksView ? "packs" : undefined}
          />
        )}
      </main>

      <Footer language={language} onReportClick={() => setShowModal(true)} />
      {showModal && (
        <BugReportModal
          language={language}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
