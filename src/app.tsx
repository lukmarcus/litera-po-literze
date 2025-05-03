import React, { useState } from "react";
import Game from "./components/game";
import MainMenu from "./components/mainMenu";
import { WordPack } from "./types/wordPack";
import { PL03BSC } from "./data/pl03Bsc";
import { PL03DCR } from "./data/pl03Dcr";
import Footer from "./components/footer";
import BugReportModal from "./components/bugReportModal";
import "./app.css";

const App: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<WordPack | null>(null);
  const [showModal, setShowModal] = useState(false);

  const wordPacks: WordPack[] = [
    {
      id: "pl03Bsc",
      name: "Podstawowe słowa",
      description: "Proste 3-literowe słowa",
      words: PL03BSC,
    },
    {
      id: "pl03Dcr",
      name: "Trudniejsze słowa",
      description: "Trudniejsze 3-literowe słowa",
      words: PL03DCR,
    },
  ];

  return (
    <div className="app">
      <header>
        <div className="logo">
          <img src="/icon.svg" alt="Logo" className="logo-icon" />
          <div>
            <h1>Litera po Literze</h1>
            <p>Nauka czytania i pisania dla dzieci</p>
          </div>
        </div>
      </header>

      <main>
        {selectedPack ? (
          <Game
            wordPack={selectedPack}
            onBackToMenu={() => setSelectedPack(null)}
          />
        ) : (
          <MainMenu wordPacks={wordPacks} onSelectPack={setSelectedPack} />
        )}
      </main>

      <Footer onReportClick={() => setShowModal(true)} />
      {showModal && <BugReportModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
