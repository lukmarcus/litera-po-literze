import React from "react";
import { WordPack } from "../types/WordPack";
import "./MainMenu.css";

interface MainMenuProps {
  wordPacks: WordPack[];
  onSelectPack: (pack: WordPack) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ wordPacks, onSelectPack }) => {
  return (
    <div className="main-menu">
      <h2>Wybierz zestaw słów</h2>
      <div className="pack-container">
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
  );
};

export default MainMenu;
