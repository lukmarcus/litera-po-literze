import React, { useState } from "react";
import { WordPack } from "../types/wordPack";
import "./mainMenu.css";

interface MainMenuProps {
  wordPacks: WordPack[];
  onSelectPack: (pack: WordPack) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ wordPacks, onSelectPack }) => {
  const [showPacks, setShowPacks] = useState(false);

  return (
    <div className="main-menu-page">
      <div className="menu-buttons">
        <button
          className="menu-button yellow"
          onClick={() => alert("Poziomy jeszcze niedostępne")}
        >
          🧠 Poziomy
        </button>
        <button
          className="menu-button green"
          onClick={() => setShowPacks(!showPacks)}
        >
          📦 Paczki
        </button>
        <button
          className="menu-button orange"
          onClick={() => alert("Instrukcje jeszcze niedostępne")}
        >
          ❓ Instrukcje
        </button>
      </div>

      {showPacks && (
        <div className="packs-section fade-in">
          <h2>Wybierz zestaw słów</h2>
          <div className="packs-container">
            {wordPacks.map((pack) => (
              <div
                key={pack.id}
                className="pack-card"
                onClick={() => onSelectPack(pack)}
              >
                <h3>{pack.name}</h3>
                <p>{pack.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
