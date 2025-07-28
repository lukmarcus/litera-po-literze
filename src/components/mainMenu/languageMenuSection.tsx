import React from "react";
import { asset } from "../../utils/asset";
import type { Language } from "../../types/language";
import type { LanguageButtonProps, LanguageMenuSectionProps } from "./types";

const LanguageButton: React.FC<LanguageButtonProps> = ({
  label,
  iconSrc,
  active,
  onClick,
}) => (
  <button
    type="button"
    className={`menu-button${active ? " lang-active" : ""}`}
    onClick={onClick}
  >
    {iconSrc && (
      <img src={iconSrc} alt={label} style={{ width: 24, height: 24 }} />
    )}
    {label}
  </button>
);

const appLanguageOptions: { value: string; label: string; iconSrc?: string }[] =
  [
    {
      value: "pl",
      label: "PL",
      iconSrc: asset("/images/languages/pl.svg"),
    },
    {
      value: "en",
      label: "EN",
      iconSrc: asset("/images/languages/en.svg"),
    },
  ];

const packLanguageOptions: {
  value: string;
  label: string;
  iconSrc?: string;
}[] = [
  ...appLanguageOptions,
  {
    value: "test",
    label: "🧪 TEST",
  },
];

const LanguageMenuSection: React.FC<LanguageMenuSectionProps> = ({
  appLanguage,
  packLanguage,
  setAppLanguage,
  setPackLanguage,
  translations,
}) => (
  <div style={{ width: "100%" }}>
    <h2>{translations.changeLanguage}</h2>
    <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          {translations.changeAppLanguage}
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {appLanguageOptions.map((opt) => (
            <LanguageButton
              key={opt.value}
              label={opt.label}
              iconSrc={opt.iconSrc}
              active={appLanguage === opt.value}
              onClick={() => setAppLanguage(opt.value as Language)}
            />
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          {translations.changePackLanguage}
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {packLanguageOptions.map((opt) => (
            <LanguageButton
              key={opt.value}
              label={opt.label}
              iconSrc={opt.iconSrc}
              active={packLanguage === opt.value}
              onClick={() => setPackLanguage(opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LanguageMenuSection;
