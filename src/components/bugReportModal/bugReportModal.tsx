import React from "react";
import "./bugReportModal.css";
import type { BugReportModalProps } from "@types";
import { translations } from "../../translations";

const BugReportModal: React.FC<BugReportModalProps> = ({
  language,
  onClose,
}) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ×
      </button>
      <h2>{translations[language].bugReportTitle}</h2>
      <p>{translations[language].bugReportDescription}</p>
      <div className="modal-buttons">
        <a
          href="https://github.com/lukmarcus/litera-po-literze/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-button github"
        >
          {translations[language].reportViaGithub}
        </a>
        <a
          href="https://forms.gle/example"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-button form"
        >
          {translations[language].reportViaForm}
        </a>
      </div>
    </div>
  </div>
);

export default BugReportModal;
