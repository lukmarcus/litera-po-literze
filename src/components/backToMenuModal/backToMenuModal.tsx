import React from "react";
import "./backToMenuModal.css";

interface BackToMenuModalProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const BackToMenuModal: React.FC<BackToMenuModalProps> = ({
  open,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel = "Anuluj",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="confirm-modal-close"
          onClick={onCancel}
          aria-label="Zamknij"
        >
          ×
        </button>
        <div className="confirm-modal-title">{title}</div>
        {message && <div className="confirm-modal-message">{message}</div>}
        <div className="confirm-modal-buttons">
          <button className="next-button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className="next-button confirm-modal-confirm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackToMenuModal;
