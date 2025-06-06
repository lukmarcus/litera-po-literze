/// <reference types="vite/client" />
import React, { useState } from "react";
import Game from "./components/game/game";
import MainMenu from "./components/mainMenu/mainMenu";
import { WordPack } from "./types/wordPack";
import { PL03BSC } from "./data/pl03Bsc";
import { PL03DCR } from "./data/pl03Dcr";
import { PL01ASD } from "./data/pl01ASD";
import { PL01QWE } from "./data/pl01QWE";
import Footer from "./components/footer/footer";
import BugReportModal from "./components/bugReportModal/bugReportModal";
import "./app.css";
import { asset } from "./utils/asset";

const App: React.FC = () => {
  const [selectedPacks, setSelectedPacks] = useState<WordPack[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const wordPacks: WordPack[] = [
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
    {
      id: "pl01ASD",
      name: "3×1 litera do testów (ASD)",
      words: PL01ASD,
    },
    {
      id: "pl01QWE",
      name: "3×1 litera do testów (QWE)",
      words: PL01QWE,
    },
  ];

  const mergedPack: WordPack | null = selectedPacks
    ? {
        id: selectedPacks.map((p) => p.id).join("-"),
        name: selectedPacks.map((p) => p.name).join(", "),
        words: selectedPacks.flatMap((p) => p.words),
      }
    : null;

  return (
    <div className="app">
      <header>
        <div className="logo">
          <img src={asset("/icon.svg")} alt="Logo" className="logo-icon" />
          <div>
            <h1>Litera po Literze</h1>
            <p>Nauka czytania i pisania dla dzieci</p>
          </div>
        </div>
      </header>

      <main>
        {mergedPack ? (
          <Game
            wordPack={mergedPack}
            onBackToMenu={() => setSelectedPacks(null)}
          />
        ) : (
          <MainMenu wordPacks={wordPacks} onSelectPack={setSelectedPacks} />
        )}
      </main>

      <Footer onReportClick={() => setShowModal(true)} />
      {showModal && <BugReportModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
