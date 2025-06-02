import React, { useState } from "react";
import { WordPack } from "../../types/wordPack";
import "./mainMenu.css";

interface MainMenuProps {
  wordPacks: WordPack[];
  onSelectPack: (packs: WordPack[]) => void;
}

// Typy trudności dla poziomów
const LEVEL_DIFFICULTIES = [
  { id: "basic", label: "Podstawowe" },
  { id: "mixed", label: "Mieszane" },
  { id: "diacritical", label: "Diakrytyczne" },
];

const MainMenu: React.FC<MainMenuProps> = ({ wordPacks, onSelectPack }) => {
  // view: 'main' | 'levels' | 'packs'
  const [view, setView] = useState<"main" | "levels" | "packs">("main");
  const [checked, setChecked] = useState<boolean[]>(wordPacks.map(() => true));

  // Handler wyboru trudności poziomów (na razie tylko alert)
  const handleLevelDifficulty = (difficulty: string) => {
    alert(`Wybrano poziomy, trudność: ${difficulty}`);
    // Tu docelowo: przekazanie wyboru do gry
  };

  return (
    <div className="main-menu-page">
      {view === "main" && (
        <div className="menu-buttons">
          <button
            className="menu-button yellow"
            onClick={() => setView("levels")}
          >
            🧠 Poziomy
          </button>
          <button
            className="menu-button green"
            onClick={() => setView("packs")}
          >
            📦 Paczki
          </button>
          <button
            className="menu-button orange"
            onClick={() => alert("Opcja jeszcze niedostępna")}
          >
            ❓ Jak grać?
          </button>
        </div>
      )}

      {view === "levels" && (
        <div className="menu-buttons">
          {LEVEL_DIFFICULTIES.map((diff) => (
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
            ← Powrót
          </button>
        </div>
      )}

      {view === "packs" && (
        <div className="menu-buttons" style={{ alignItems: "stretch" }}>
          <h2>Wybierz zestawy słów</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const selected = wordPacks.filter((_, i) => checked[i]);
              if (selected.length > 0) onSelectPack(selected);
            }}
          >
            {wordPacks.map((pack, idx) => (
              <label
                key={pack.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75em",
                  background: "#e6ffe6",
                  borderRadius: 8,
                  padding: "0.5em 1em",
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
                <span>
                  <span style={{ fontWeight: "bold" }}>{pack.name}</span>
                  <br />
                  <span style={{ fontSize: "0.95em", color: "#444" }}>
                    {pack.description}
                  </span>
                </span>
              </label>
            ))}
            <button
              className="menu-button green"
              type="submit"
              disabled={checked.every((v) => !v)}
              style={{ marginTop: "1.5rem" }}
            >
              Zagraj
            </button>
          </form>
          <button
            className="menu-button"
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            ← Powrót
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
