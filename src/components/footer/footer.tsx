import React from "react";
import { version } from "../../../package.json";
import "./footer.css";
import { FooterProps } from "./types";

const Footer: React.FC<FooterProps> = ({ onReportClick }) => (
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
      Zgłoś błąd
    </button>
  </footer>
);

export default Footer;
