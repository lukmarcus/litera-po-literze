/// <reference types="vite/client" />
import React, { useState, useEffect } from "react";
import Game from "./components/game/game";
import MainMenu from "./components/mainMenu/mainMenu";
import type { AppProps, WordPack, Language, PackLanguage } from "@types";
import { enWordPacks } from "./wordPacks/en";
import { plWordPacks } from "./wordPacks/pl";
import { testWordPacks } from "./wordPacks/test";
import Footer from "./components/footer/footer";
import BugReportModal from "./components/bugReportModal/bugReportModal";
import "./app.css";
import { asset } from "./utils/asset";
import { translations } from "@translations";

const App: React.FC<AppProps> = ({
  initialAppLang,
  initialPackLang,
  setLanguagesToHash,
}) => {
  const [selectedPacks, setSelectedPacks] = useState<WordPack[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPacksView, setShowPacksView] = useState(false);
  const [language, setLanguage] = useState<Language>(
    initialAppLang as Language
  );
  const [selectedPackLanguage, setSelectedPackLanguage] =
    useState<PackLanguage>(initialPackLang as PackLanguage);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      const [appLang, packLang] = hash.split("-");
      if (appLang && ["pl", "en"].includes(appLang))
        setLanguage(appLang as Language);
      if (packLang && ["pl", "en", "test"].includes(packLang))
        setSelectedPackLanguage(packLang as PackLanguage);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleLanguageChange = (newLanguage: PackLanguage) => {
    const safeLang: Language = newLanguage === "en" ? "en" : "pl";
    setLanguage(safeLang);
    setLanguagesToHash(safeLang, selectedPackLanguage);
  };
  const handlePackLanguageChange = (newPackLang: PackLanguage) => {
    const safePackLang: PackLanguage =
      newPackLang === "en" ? "en" : newPackLang === "test" ? "test" : "pl";
    setSelectedPackLanguage(safePackLang);
    setLanguagesToHash(language, safePackLang);
  };
  const handleChangePacks = () => {
    setSelectedPacks(null);
    setShowPacksView(true);
  };

  const allWordPacks = [...plWordPacks, ...enWordPacks, ...testWordPacks];

  const mergedPack: WordPack | null = selectedPacks
    ? {
        id: selectedPacks.map((p) => p.id).join("-"),
        name: {
          pl: selectedPacks
            .map((p) =>
              typeof p.name === "object"
                ? p.name.pl || p.name.en || Object.values(p.name)[0] || ""
                : String(p.name)
            )
            .join(", "),
          en: selectedPacks
            .map((p) =>
              typeof p.name === "object"
                ? p.name.en || p.name.pl || Object.values(p.name)[0] || ""
                : String(p.name)
            )
            .join(", "),
        },
        type: "basic",
        language: selectedPacks[0].language,
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
            <h1>{translations[language as Language].title}</h1>
            <p>{translations[language as Language].subtitle}</p>
          </div>
        </div>
      </header>

      <main>
        {mergedPack ? (
          <Game
            wordPack={mergedPack}
            language={language as Language}
            onBackToMenu={() => {
              setSelectedPacks(null);
              setShowPacksView(false);
            }}
            onChangePacks={handleChangePacks}
          />
        ) : (
          <MainMenu
            wordPacks={allWordPacks}
            language={language as Language}
            setLanguage={handleLanguageChange}
            setPackLanguage={handlePackLanguageChange}
            packLanguage={selectedPackLanguage}
            onSelectPack={(packs) => {
              setSelectedPacks(packs);
              setShowPacksView(false);
            }}
            initialView={showPacksView ? "packs" : undefined}
          />
        )}
      </main>

      <Footer
        language={language as Language}
        onReportClick={() => setShowModal(true)}
      />
      {showModal && (
        <BugReportModal
          language={language as Language}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
