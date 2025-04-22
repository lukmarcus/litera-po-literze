import React, { useState } from "react";
import Game from "./components/Game";
import MainMenu from "./components/main-menu";
import { WordPack } from "./types/word-pack";
import { PL_03_BSC } from "./data/pl-03-bsc";
import { PL_03_DCR } from "./data/pl-03-dcr";
import "./app.css";

const App: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<WordPack | null>(null);

  const wordPacks: WordPack[] = [
    {
      id: "pl-03-bsc",
      name: "Podstawowe słowa",
      description: "Proste 3-literowe słowa",
      words: PL_03_BSC,
    },
    {
      id: "pl-03-dcr",
      name: "Trudniejsze słowa",
      description: "Trudniejsze 3-literowe słowa",
      words: PL_03_DCR,
    },
  ];

  return (
    <div className="app">
      <header>
        <h1>Litera po Literze</h1>
        <p>Nauka czytania i pisania dla dzieci</p>
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
    </div>
  );
};

export default App;
