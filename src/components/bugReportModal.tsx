import React from "react";
import "./bugReportModal.css";

interface BugReportModalProps {
  onClose: () => void;
}

const BugReportModal: React.FC<BugReportModalProps> = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ×
      </button>
      <h2>Zgłoś błąd</h2>
      <p>Wybierz sposób zgłoszenia problemu:</p>
      <div className="modal-buttons">
        <a
          href="https://github.com/lukmarcus/litera-po-literze/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-button github"
        >
          🐛 Zgłoś przez GitHub
        </a>
        <a
          href="https://forms.gle/example"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-button form"
        >
          📝 Zgłoś przez formularz
        </a>
      </div>
    </div>
  </div>
);

export default BugReportModal;
