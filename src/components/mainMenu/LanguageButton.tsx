import React from "react";
import { LanguageButtonProps } from "./types";

const LanguageButton: React.FC<LanguageButtonProps> = ({
  label,
  iconSrc,
  active = false,
  onClick,
  className = "menu-button",
}) => (
  <button
    className={className + (active ? " lang-active" : "")}
    onClick={onClick}
    type="button"
  >
    {iconSrc ? (
      <img
        src={iconSrc}
        alt={label}
        style={{
          maxHeight: 24,
          verticalAlign: "middle",
          marginRight: 4,
          display: "inline-block",
        }}
      />
    ) : null}
    {label}
  </button>
);

export default LanguageButton;
