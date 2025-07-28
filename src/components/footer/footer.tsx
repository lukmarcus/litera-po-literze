import React from "react";
import { version } from "../../../package.json";
import "./footer.css";
import type { FooterProps } from "@types";
import { translations } from "../../translations";

const Footer: React.FC<FooterProps> = ({ language, onReportClick }) => (
  <footer className="footer">
    © 2025 Marek Szumny · v{version} ·{" "}
    <a
      href="https://github.com/lukmarcus/litera-po-literze"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>{" "}
    ·{" "}
    <button onClick={onReportClick} className="link-button">
      {translations[language].reportBug}
    </button>
  </footer>
);

export default Footer;
