import React, { useState, useEffect } from "react";
import { MainMenuProps } from "./types";
import "./mainMenu.css";

const LEVEL_DIFFICULTIES = [
  { id: "basic", label: "Podstawowe" },
  { id: "mixed", label: "Mieszane" },
  { id: "diacritical", label: "Diakrytyczne" },
];

const MainMenu: React.FC<MainMenuProps> = ({
  wordPacks,
  onSelectPack,
  initialView,
}) => {
  const [view, setView] = useState<"main" | "levels" | "packs">(
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

  const handleLevelDifficulty = (difficulty: string) => {
    alert(`Wybrano poziomy, trudność: ${difficulty}`);
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
              localStorage.setItem("lastChecked", JSON.stringify(checked));
              const selected = wordPacks.filter((_, i) => checked[i]);
              if (selected.length > 0) onSelectPack(selected);
            }}
          >
            {wordPacks.map((pack, idx) => (
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
                {pack.name}
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
