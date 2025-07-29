import React from "react";
import type { PackMenuSectionProps } from "@types";

const PackMenuSection: React.FC<PackMenuSectionProps> = ({
  wordPacks,
  checked,
  setChecked,
  onSelectPack,
  translations,
  language,
  onBack,
}) => (
  <div className="menu-buttons" style={{ alignItems: "stretch" }}>
    <h2>{translations.selectPacks}</h2>
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
        if (selected.length > 0) {
          onSelectPack(selected);
        } else {
          alert(translations.selectAtLeastOnePack);
        }
      }}
    >
      {wordPacks.length === 0 ? (
        <div style={{ color: "red", fontWeight: "bold", margin: "1em 0" }}>
          {translations.noPacksForLanguage}
        </div>
      ) : (
        wordPacks.map((pack, idx) => (
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
        disabled={wordPacks.length === 0 || checked.every((v) => !v)}
        style={{ marginTop: "1.5rem" }}
      >
        {translations.play}
      </button>
    </form>
    <button
      className="menu-button"
      onClick={onBack}
      style={{ marginTop: "2rem" }}
    >
      {translations.back}
    </button>
  </div>
);

export default PackMenuSection;
